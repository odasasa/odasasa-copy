import { dbCon } from "@/libs/mongoose/dbCon";
import { PaymentModel } from "@/libs/mongoose/models";
import {
  createRecord,
  getRecordByFields,
  getRecords,
} from "@/libs/mongoose/mongoseCrud";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";
const table = "payment";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url) || null;

  try {
    let data;
    await dbCon();
    if (vendor) {
      //  data = await getRecordByFields(table,{vendor})
      data = await PaymentModel.find({ vendor });
    } else {
      data = await PaymentModel.find();
    }

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

export async function POST(request: Request) {
  try {
    let body = await request.json();

    const result = await createRecord(table, body);

    return new NextResponse(JSON.stringify({ result }), { status: 201 });
  } catch (error: any) {
    console.log({ error: error.message });
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
