"use client"
import { DzFileUpload, useDzUpload } from "@/components";
import ImageUploadForm from "@/components/templates/upload/upload";
import { useEffect } from "react";

export default function OrderPage() {


    const { uploadField, error, filepath, success } = useDzUpload()
    useEffect(() => {
        if(success) alert(filepath)
    }, [filepath,success])

    return <div className="px-4 py-2 md:px-8 md:py-4">
        {/* <ImageUploadForm /> */}
        <p className="my-5 border-b-4 border-solid "></p>
        {/* <DzFileUpload /> */}
        {uploadField}
        {/* <p>Hello there </p> */}
    </div>
}