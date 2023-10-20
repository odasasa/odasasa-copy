import { pwdHasher } from "@/libs/bcrypt/passord";
import {
  deleteRecord,
  getRecordById,
  updateRecord,
} from "@/libs/mongoose/mongoseCrud";
import { NextResponse } from "next/server";

const table = "Users";
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
        {
          status: 404,
        }
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
    return new NextResponse(JSON.stringify({ message: result }));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
export async function PUT(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  let body = await request.json();

  if (Object.keys(body).includes('password')) {
    const hashedPassword = pwdHasher(body.password)
    body['passowrd'] = hashedPassword
  }

  try {
    const result = await updateRecord(table, slug, body);
    return new NextResponse(JSON.stringify({success:true, message: result }));
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
