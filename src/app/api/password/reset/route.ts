import { pwdHasher } from "@/libs/bcrypt/passord";
import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import {
  findPasswordResetRecord,
  markPasswordResetRecordAsUsed,
} from "@/libs/mongoose/passwordReset";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let { token, password } = await request.json();

  try {
    await dbCon();

    let savedRecord = await findPasswordResetRecord(token);
    if (!savedRecord)
      return new NextResponse(JSON.stringify({ msg: "Invalid token ", savedRecord }), {
        status: 404,
      });

    let updatedUser = await UserModel.updateOne(
      { email: savedRecord.email },
      {
        password: pwdHasher(password),
      }
    );

    let upadted = await markPasswordResetRecordAsUsed(savedRecord.email, token);

    if (!upadted || !updatedUser)
      return new NextResponse(
        JSON.stringify({ msg: "Reset failed. Try again" }),
        {
          status: 500,
        }
      );

    return new NextResponse(
      JSON.stringify({
        msg: "Password Successfully Reset. Go to login ",
      })
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: "An error has occured!" }), {
      status: 500,
    });
  }
}
