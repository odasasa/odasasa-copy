import { deleteAll } from "@/libs/mongoose/mongoseCrud";
import { getSearchParams } from "@/utils/key_functions";


export async function GET(request: Request) {
  const table = getSearchParams(request.url,"table") as string;

  try {
    
    if (table) {
     await deleteAll(table);
   
    }

    return new Response(JSON.stringify({msg:"Deleted successfully"}), {
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

  