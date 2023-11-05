import { handleFileUpload } from "@/utils/upload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  try {
    const res = await handleFileUpload(data.get("file") as unknown as File);
    return new NextResponse(JSON.stringify(res));
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
