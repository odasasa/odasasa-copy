import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import {
  createUserActivationRecord,
  findUserActivationRecord,
  markUserActivationRecordAsUsed,
} from "@/libs/mongoose/userActivation";
import { generateUniqueToken } from "@/libs/uniqueKey";
import { handlesendConfirmationEmail } from "@/utils/emails/ConfirmationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const [token, email, name] = await request.json();

    try {
      await dbCon();
      //get token and get read
      const activationRecord = await findUserActivationRecord(token);
      let emailStatus;
      if (!activationRecord) {
        // check if user exists

        let user = await UserModel.findOne({ email });
        if (!user)
          return new NextResponse(
            JSON.stringify({ sucees: false, message: "An error has ocured!" })
          );

        let activationToken = generateUniqueToken();
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

      await markUserActivationRecordAsUsed(email, token);
      return new NextResponse(
        JSON.stringify({ success: true, activationRecord })
      );
    } catch (error) {}
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
