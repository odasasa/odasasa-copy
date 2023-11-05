import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";

const table = "Users";
export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);
  try {
    await dbCon();
    const user = await UserModel.findOne({ vendor });
    if (!user)
      return new NextResponse(
        JSON.stringify({
          error: `${table.substring(0, table.length - 2)} not found`,
        }),
        {
          status: 404,
        }
      );

    return new NextResponse(JSON.stringify(user));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
