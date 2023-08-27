import { sendTestEmail } from "@/libs/nodemailer/gmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        let body = await request.json(),
            { email, name, subject } = body;
            // return NextResponse.json(body);


        let p = await sendTestEmail(email, subject, "Another Email Test");
        return NextResponse.json({ msg: 'Email sent successfully ', p });
    } catch (error: any) {
        console.log({ error: error.message });
        return NextResponse.json({ error: error.message });
      
    }
}