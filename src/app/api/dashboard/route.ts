import { dbCon } from "@/libs/mongoose/dbCon";
import {
  CategoryModel,
  OrderModel,
  ProductModel,
  UserModel,
} from "@/libs/mongoose/models";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);
  let data = null;
  try {
    await dbCon();
    const user = await UserModel.findOne({ vendor });

    // let data:{vendors:number,categories:number,orders:number};
    const [fetchedVendors, fetchedCategories, fetchedProducts, fetchedOrders] =
      await Promise.all([
        UserModel.find({
          $nor: [{ role: "su" }, { vendor }, { role: "admin" }],
        }).count(),
        CategoryModel.find({ vendor }).count(),
        ProductModel.find({ vendor }).count(),
        OrderModel.find({ vendor }).count(),
      ]);

    ["su", "admin"].includes(user.role)
      ? (data = {
          fetchedVendors,
          fetchedWallet: "KES 0",
          "fetchedActive Vendors": 0,
          "fetchedInactive Vendors": 0,
        })
      : (data = {
          fetchedCategories,
          fetchedProducts,
          fetchedOrders,
        });

    return new NextResponse(JSON.stringify(data), {
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

export async function POST(request: Request) {}
