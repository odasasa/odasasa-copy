import { checkIfExists } from "@/libs/mongoose/mongoseCrud";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";

// c9XddCqLzuNiDNDQ

export async function POST(request: Request) {
  const field = await request.json();
  const table = getSearchParams(request.url, "table") as string;
  try {
    let exists = await checkIfExists(table, field);
    if (!exists)
      return new NextResponse(JSON.stringify({ success: false }), {
        status: 200,
      });

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    // console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ sucess: false }), { status: 500 });
  }
}
