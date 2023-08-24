import { NextResponse } from 'next/server';

const table = 'users';
export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: any } }
) {
  try {
    return NextResponse.json({});
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: any } }
) {
  try {
   

    return NextResponse.json({ resp:"Hello" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
export async function PUT(
  request: Request,
  { params }: { params: { slug: any } }
) {
  let body = await request.json();

 try{

    return NextResponse.json({ resp:"" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}