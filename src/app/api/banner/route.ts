import { banners } from '@/dummy_data/banners';
import { dbCon } from '@/libs/mongoose/dbCon';
import { BannerModel } from '@/libs/mongoose/models';
import { createRecord, getRecords } from '@/libs/mongoose/mongoseCrud';
import { NextResponse } from 'next/server';
const table = "banners"

export async function GET(request: Request) {
  let params = new URL(request.url).searchParams
  const vendor = params.get('vendor') || 'vendor'



  try {
    // return new Response(JSON.stringify(data))
    let fetched = [];
    await dbCon()
    fetched = await BannerModel.find({ vendor });
    console.log("initial fetch", fetched)
    if (fetched.length < 1) {
      console.log("No data, intiate insert", fetched)
      await BannerModel.insertMany(banners.map((b: any) => {
        return { ...b, vendor: vendor }

      }));
      
      console.log("Inserted success fully")
      fetched = await BannerModel.find({ vendor });
      console.log("fetched after insert")
    }

    return new Response(JSON.stringify(fetched), {
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
  const data = [
    {
      vendor: "vendor",
      name: "Banner1",
      src: "b1-2023-09-12T09-14-58.992Z.jpg"
    },
    {
      vendor: "vendor",
      name: "Banner2",
      src: "b2-2023-09-12T09-19-12.283Z.jpeg"
    },
    {
      vendor: "vendor",
      name: "Banner3",
      src: "banner_default.jpg"

    }
  ]
  try {


    let body = await request.json();

    const result = await createRecord(table, body);
    // const fetched = await getRecords(table);



    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.log({ error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}