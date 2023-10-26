import {
  createUserActivationRecord,
  findUserActivationRecord,
} from "@/libs/mongoose/userActivation";
import { generateUniqueToken } from "@/libs/uniqueKey";
import { handlesendConfirmationEmail } from "@/utils/emails/ConfirmationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body = await request.json(),
      [token, email, name] = body;

    try {
      //get token and get read
      const activationRecord = await findUserActivationRecord(token || "");
      let emailStatus;
      if (!activationRecord) {
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
