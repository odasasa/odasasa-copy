import { categories } from '@/dummy_data/categories';
import { createRecord,  getRecords } from '@/libs/mongoose/mongoseCrud';
import { NextResponse } from 'next/server';
const table = "categories"





export async function GET(request: Request) {
 
  try {
    const data = await getRecords(table);
    
    return new Response(JSON.stringify(data?.length>0?data:categories), {
      status: 200,
      statusText: 'OK',
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
          });
  }
}

export async function POST(request: Request) {
  try {
    let body = await request.json();

    const result = await createRecord(table, body);
   
   
    return NextResponse.json({result},{status:201});
  } catch (error: any) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, {status:500});
    
  }
}