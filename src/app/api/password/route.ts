import { dbCon } from "@/libs/mongoose/dbCon";
import { PasswordResetModel, UserModel } from "@/libs/mongoose/models";
import { createPasswordResetRecord } from "@/libs/mongoose/passwordReset";
import { generateUniqueToken } from "@/libs/uniqueKey";
import { sendPasswordResetEmail } from "@/utils/emails/PasswordResetEmail";
import { NextResponse } from "next/server";
import { PassThrough } from "nodemailer/lib/xoauth2";

export async function POST(request: Request) {
  let { email } = await request.json();
  try {
    await dbCon();
    let user = await UserModel.findOne({ email });
    if (!user)
      return new NextResponse(JSON.stringify({ msg: "User not found" }), {
        status: 404,
      });

    let token = generateUniqueToken(),
      savedRecord = await createPasswordResetRecord(email, token);

    if (!savedRecord!)
      return new NextResponse(
        JSON.stringify({ msg: "Recovery failed. Try again" }),
        {
          status: 500,
        }
      );

    let sent = await sendPasswordResetEmail(email, token);

    if (!sent)
      return new NextResponse(
        JSON.stringify({ msg: "Recovery failed. Try again" }),
        {
          status: 500,
        }
      );

    return new NextResponse(
      JSON.stringify({
        msg: "A Password rest link has been sent to the your email. ",
        savedRecord
      })
    );

  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "An error has occured!" }), {
      status: 500,
    });
  }
}



const table = "payment";

export async function GET(request: Request) {


  try {
    await dbCon()
    let data = await PasswordResetModel.find()
   

    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: "OK",
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
