import { dbCon } from "@/libs/mongoose/dbCon";
import { UserModel } from "@/libs/mongoose/models";
import { getSearchParams } from "@/utils/key_functions";

export async function GET(request: Request) {
  const vendor = getSearchParams(request.url) || "";

  try {
    await dbCon();
    const shops = await UserModel.find({
      vendor: (vendor as string).trim().toLowerCase(),
    });

    return new Response(JSON.stringify(shops), {
      status: 200,
    });
  } catch (error: any) {
    console.log({ error: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
