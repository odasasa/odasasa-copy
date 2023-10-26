import mongoose from "mongoose";
import { pwdHasher } from "@/libs/bcrypt/passord";
import { UserModel } from "@/libs/mongoose/models";
import { getRecordByFields, getRecords } from "@/libs/mongoose/mongoseCrud";

import { NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
import { sendTestEmail } from "@/libs/nodemailer/gmail";
import { strCapitalize } from "@/utils";
import { BASE_PATH } from "@/utils/next_host";
import { getSearchParams } from "@/utils/key_functions";
import { randomUUID } from "crypto";
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
    // return NextResponse.json(obody, { status: 201 });

    if (body["vendor"].includes("odasa")) {
      body["role"] = "admin";
    } else if (body["vendor"].includes("mds")) {
      body["role"] = "su";
    } else {
      body["role"] = "vendor";
    }
    body["status"] = false;
    body["idNumber"] = randomUUID();
    const hashedPassword = pwdHasher(body["password"]);
    body["password"] = hashedPassword;

    // const result = await createRecord(table, body);
    await dbCon();
    const newUser = new UserModel(body);
    let saved = await newUser.save();

    let user = body;
    let p = await sendTestEmail(
      user.email,
      "Confirmation Email",
      `Drear ${strCapitalize(user.name.split("").at(0))}, \n\n
        Congratulations ! Your account has been successfully created.\n\n
        Go to this link ${BASE_PATH}/auth/activate/${user.phone}-${
        user.idNumber
      }
        You have 24hrs to activate your account. Hurry up to avoid inconviences.

      Regards,

      Odasasa Admin
      `
    );
    return new NextResponse(JSON.stringify({ saved, body, emailStatus: p }), {
      status: 201,
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    });
  }
}
