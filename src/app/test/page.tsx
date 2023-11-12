"use client";

import { Button, useDzUpload } from "@/components";
import { ACCEPTED_IMAGE_EXT } from "@/constants";

export default function Page() {
  const { success, filepath, uploadField, error } = useDzUpload(ACCEPTED_IMAGE_EXT,`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,'image');
  return (
    <div className="flex flex-col items-center justify-center h-96 ">
      <p className="my-12">TEST PAGE {1 + 3}</p>
      <Button className="w-[200px]">Hello Word</Button>
      <div className="w-full px-8 py-4">{uploadField}</div>
      {filepath ? <div className="px-8 py-4 my-4"><img src={filepath} /></div> : null}
    </div>
  );
}
