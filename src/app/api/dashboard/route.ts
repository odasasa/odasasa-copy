import { CategoryModel, OrderModel, ProductModel, UserModel } from "@/libs/mongoose/models";
import { getSearchParams } from "@/utils/key_functions";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const vendor = getSearchParams(request.url);

  try {
    // let data:{vendors:number,categories:number,orders:number};
    const [fetchedVendors, fetchedCategories, fetchedProducts, fetchedOrders] =
      await Promise.all([
        UserModel.find({ $nor: [{ vendor: "su" }, { vendor}] }).count(),
        CategoryModel.find({vendor}).count(),
        ProductModel.find({vendor}).count(),
        OrderModel.find({vendor}).count()
      ]);
   

    return new Response(
      JSON.stringify({
        fetchedVendors,
        fetchedCategories,
        fetchedProducts,
        fetchedOrders,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  
}
