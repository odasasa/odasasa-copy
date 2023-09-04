import { createRecord, getRecordByFields, getRecords } from '@/libs/mongoose/mongoseCrud';
import { NextResponse } from 'next/server';
const table = "Users"


export async function POST(request: Request) {
  try {
    let body = await request.json();
  
   const result = await getRecordByFields(table,body);
     
     return NextResponse.json({result},{status:201});
  } catch (error: any) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message },
       {status:500, headers:{
      "Content-Type":"application/json"
  }});
    
  }
}