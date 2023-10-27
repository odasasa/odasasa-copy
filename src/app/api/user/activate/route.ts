import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import {
  createUserActivationRecord,
  findUserActivationRecord,
} from "@/libs/mongoose/userActivation";
import { generateUniqueToken } from "@/libs/uniqueKey";
import { handlesendConfirmationEmail } from "@/utils/emails/ConfirmationEmail";
import { NextResponse } from "next/server";
import { useState } from "react";

export async function POST(request: Request) {
  try {
   
    const [token, email, name] = await request.json();

    try {
      //get token and get read
      const activationRecord = await findUserActivationRecord(token || "");
      let emailStatus;
      if (!activationRecord) {
        // check if user exists
        await dbCon;
        let user = await UserModel.findOne({ email });
        if (!user)
          return new NextResponse(
            JSON.stringify({ sucees: false, message: "An error has ocured!" })
          );

        let activationToken = await generateUniqueToken();
        await createUserActivationRecord(email, activationToken);
        emailStatus = await handlesendConfirmationEmail(
          name.split(" ")[0] || "",
          email,
          activationToken
        );
        return new NextResponse(
          JSON.stringify({ success: false, emailStatus })
        );
      }
      return new NextResponse(
        JSON.stringify({ sucees: true, activationRecord })
      );
    } catch (error) {}
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
