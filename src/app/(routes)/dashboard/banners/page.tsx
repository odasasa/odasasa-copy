"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Wrapper } from "@/components/templates/dashboard/main";
import { BannerCard, Typography, useDzUpload } from "@/components";
import { banners as defBanners } from "@/dummy_data/banners";
import { useFetch } from "@/hooks";
import { ACCEPTED_IMAGE_EXT } from "@/constants";
import Swal from "sweetalert2";
import { mergeBanners } from "@/utils/key_functions";
import { Banner } from "@/types";

const BannersPage = ({ params }: any) => {
  const searchParams = useSearchParams();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndx, setActiveIndx] = useState<number | null>(null);
  const { success, uploadField, error, filepath } = useDzUpload(
    ACCEPTED_IMAGE_EXT,
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,
    "image"
  );

  // console.log({ params });
  const { data: _banners } = useFetch(
    `/api/banner?vendor=${searchParams.get("owner") || params.vendor}`
  );
  // const [banners, setBanners] = useState<BannerProp[] | null>(data!);
  useEffect(() => {
    if (_banners) setBanners(_banners as Banner[]);
  }, [activeIndx, _banners]);

  useEffect(() => {

   
    if (success) {

      (async () => {
        try {
          const res = await (
            await fetch(`/api/banner?vendor=${params.vendor}`, {
              method: "POST",
              body: JSON.stringify({
                name: `Banner${activeIndx! + 1}`,
                src: filepath,
              }),
            })
          ).json();
          if (!res.success) throw new Error("Upload failed");
          if (_banners)
            setBanners(mergeBanners(defBanners, res.banners as Banner[]));
          Swal.fire({
            title: "Success Message",
            text: "Banner Uploaded Successfully",
            icon: "success",
          });
          console.log({ res });
        } catch (error: any) {
          console.log({ uploadError: error.message });
          Swal.fire({
            title: "Good job!",
            text: "Upload failed. Try again",
            icon: "error",
          });
        }
        setActiveIndx(null);
      })();
    }


  
  }, [filepath, success, params, activeIndx, _banners]);

  const handleActiveIndx: any = (indx: number) => {
    setActiveIndx(indx);
  };
  console.log({ banners });
  // if (banners?.length) return <div>No data</div>
  return (
    <Wrapper className="relative">
      {/* Headers */}
      <div className="px-3 py-2">
        <Typography variant="h4">Carousel Banners</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {Array.isArray(banners) && banners.length > 0
          ? banners?.map((banner, indx: number) => (
              <BannerCard
                key={indx}
                indx={indx}
                activeIndx={activeIndx}
                setActiveIndx={handleActiveIndx}
                uploadField={uploadField}
                banner={banner}
              />
            ))
          : defBanners?.map((banner, indx: number) => (
              <BannerCard
                key={indx}
                indx={indx}
                activeIndx={activeIndx}
                setActiveIndx={handleActiveIndx}
                uploadField={uploadField}
                banner={banner}
              />
            ))}
      </div>
    </Wrapper>
  );
};

export default BannersPage;
