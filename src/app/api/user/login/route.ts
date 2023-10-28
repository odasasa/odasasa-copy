import { pwdConfirm } from "@/libs/bcrypt/passord";
import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import { NextResponse } from "next/server";
const table = "Users";

export async function POST(request: Request) {
  try {
    let body = await request.json(),
      { password, email } = body;

    await dbCon();
    const checkActivation = await UserModel.find({
      email,
      activationStatus: false,
    });

    if (checkActivation.length > 0)
      return new NextResponse(
        JSON.stringify({
          success: false,
          activationError: true,
          checkActivation,
        })
      );

    const users = await UserModel.find({
      $or: [{ email }, { vendor: email }],
    });

    if (!users)
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    let user: any;
    users.forEach((u) => {
      if (pwdConfirm(password, u.password)) user = u;
    });
    if (!user)
      return new NextResponse(
        JSON.stringify({ error: "Invalid Login credentials" }),
        { status: 401 }
      );

    return new NextResponse(JSON.stringify(user), { status: 201 });
    // redirect(`/${user?.vendor}/dashboard`);
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
