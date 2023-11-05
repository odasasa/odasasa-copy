"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Wrapper } from "@/components/templates/dashboard/main";
import { BannerCard, Typography, useDzUpload } from "@/components";
import { banners as defBanners } from "@/dummy_data/banners";
import { useFetch } from "@/hooks";

interface BannerProp {
  name: string;
  src: string;
}

const BannersPage = ({ params }: any) => {
  const searchParams = useSearchParams();

  const [banners, setBanners] = useState<BannerProp[] | null>(null);
  const [activeIndx, setActiveIndx] = useState<number | null>(null);
  const { success, uploadField, error, filepath } = useDzUpload([
    "jpg",
    "png",
    "jpeg",
    "gif",
  ]);

  // console.log({ params });
  const {data} = useFetch(
    `/api/banner?vendor=${searchParams.get("owner") || params.vendor}`
  );


  useEffect(() => {
  
    if (filepath) {
      // alert(filepath)
      setBanners((old) => {
        let bnrs = old as BannerProp[];
        bnrs[activeIndx!].src = `${filepath}`;
        return bnrs;
      });
      setActiveIndx(null);
    }
  }, [filepath, success, activeIndx,banners]);

  const handleActiveIndx: any = (indx: number) => {
    setActiveIndx(indx);
  };
console.log({banners})
  // if (banners?.length) return <div>No data</div>
  return (
    <Wrapper className="relative">
      {/* Headers */}
      <div className="px-3 py-2">
        <Typography variant="h4">Carousel Banners</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {Array.isArray(banners) && banners.length> 0 ? banners?.map((banner, indx: number) => (
          <BannerCard
            key={indx}
            indx={indx}
            activeIndx={activeIndx}
            setActiveIndx={handleActiveIndx}
            uploadField={uploadField}
            banner={banner}
          />
        )): defBanners?.map((banner, indx: number) => (
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
