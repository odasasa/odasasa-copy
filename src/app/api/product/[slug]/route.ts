import {
  deleteRecord,
  getRecordById,
  updateRecord,
} from "@/libs/mongoose/mongoseCrud";
import { deleteUploadedFile, moveFilesToUpload } from "@/utils/upload";
import { NextResponse } from "next/server";

const table = "Products";
export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const product = await getRecordById(table, slug);
    if (product) {
      return new NextResponse(JSON.stringify(product));
    } else {
      return new NextResponse(
        JSON.stringify({
          error: `${table.substring(0, table.length - 2)} not found`,
        }),
        { status: 400 }
      );
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }));
  }
}

export async function DELETE(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    const fetchedProduct = await getRecordById(table, slug);
    const result = await deleteRecord(table, slug);
    if (fetchedProduct.img) await deleteUploadedFile(fetchedProduct.img);

    return new NextResponse(JSON.stringify({ success: true, message: result }));
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
    if (body.img) {
      await moveFilesToUpload(body.img);
    }
    return new NextResponse(JSON.stringify({ success: true, message: result }));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
