import { pwdHasher } from "@/libs/bcrypt/passord";
import { UserModel } from "@/libs/mongoose/models";
import { getRecords } from "@/libs/mongoose/mongoseCrud";

import { NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";

import { getSearchParams } from "@/utils/key_functions";

import { generateUniqueToken } from "@/libs/uniqueKey";
import { createUserActivationRecord } from "@/libs/mongoose/userActivation";
import { handlesendConfirmationEmail } from "@/utils/emails/ConfirmationEmail";
const table = "users";
const headers: any = {
  "Content-Type": "application/json",
};
export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);
  try {
    let data;
    await dbCon();
    data = await UserModel.find({
      $nor: [{ vendor: "su" }, { vendor }, { vendor: "admin" }],
    });
    // data= data.filter((v:any)=>['su','admin'].includes(v.role) === false)
    // console.log()
    if (vendor)
      data = await UserModel.find({
        $nor: [{ vendor: "su" }, { vendor }, { vendor: "admin" }],
      });
    //  await getRecordByFields(table, { vendor });
    else data = await getRecords(table);

    return new Response(
      JSON.stringify(
        data
          .filter((v: any) => !["su", "admin"].includes(v.role))
          .sort((a: any, b: any) => b.created_at - a.created_at) || []
      ),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}

export async function POST(request: Request) {
  try {
    let obody = await request.json(),
      { confirmPassword, ...body } = obody;

    if (body["vendor"].includes("odasa")) {
      body["role"] = "admin";
    } else if (body["vendor"].includes("mds")) {
      body["role"] = "su";
    } else {
      body["role"] = "vendor";
    }
    body["status"] = false;
    // body["idNumber"] = body["vendor"]+`xxx${Math.random() * 1000}yyy${Math.random() * 1000}`;
    const hashedPassword = pwdHasher(body["password"]);
    body["password"] = hashedPassword;

    // const result = await createRecord(table, body);
    await dbCon();
    await UserModel.updateMany({}, {$unset:{idNumber:1}})
    const newUser = new UserModel(body);
    let activationToken = await generateUniqueToken();
    let createdActivationRecord = await createUserActivationRecord(
      body["email"],
      activationToken 
    );

    if (!createdActivationRecord) throw new Error("Errormessage=>");

    let saved = await newUser.save();

    const emailStatus = await handlesendConfirmationEmail(
      body.name.split(" ")[0] || "",
      body["email"],
      activationToken
    );

    return new NextResponse(
      JSON.stringify({ success: true, saved, body, emailStatus }),
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}
