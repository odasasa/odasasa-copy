import { banners } from "@/dummy_data/banners";
import { dbCon } from "@/libs/mongoose/dbCon";
import { BannerModel } from "@/libs/mongoose/models";
import {
  createRecord,
  getRecordByFields,
  getRecords,
} from "@/libs/mongoose/mongoseCrud";
import { Banner } from "@/types";
import { getSearchParams, mergeBanners } from "@/utils/key_functions";
import { NextResponse } from "next/server";
const table = "banners";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);

  try {
    let data;
    if (vendor) {
      data = await getRecordByFields(table, { vendor });
      data = mergeBanners(banners,data)
    } else {
      data = await getRecords(table);
      data = mergeBanners(banners,data)
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
    const vendor = getSearchParams(request.url);
    const result = await createRecord(table, { ...body, vendor });
    let _banners: Banner[] = [];
    if (!result) return new Error("Error Uploading");
    await dbCon();
    _banners = await BannerModel.find({ vendor });
    _banners = mergeBanners(banners,_banners)

    return new Response(JSON.stringify({ success: true, banners:_banners, result }), {
      status: 201,
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
