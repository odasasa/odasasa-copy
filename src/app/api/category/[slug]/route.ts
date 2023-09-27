import {
  deleteRecord,
  getRecordById,
  updateRecord,
} from "@/libs/mongoose/mongoseCrud";
import { NextResponse } from "next/server";

const table = "categories";
export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const product = await getRecordById(table, slug);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json(
        { error: `${table.substring(0, table.length - 2)} not found` },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const result = await deleteRecord(table, slug);
    if (!result) throw Error("Delete opreattion failed!");
    return new NextResponse(
      JSON.stringify({ success: true, message: "Deleted Successfully" })
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function PUT(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  let body = await request.json();

  try {
    const result = await updateRecord(table, slug, body);
    return NextResponse.json({success:true, message: result });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
