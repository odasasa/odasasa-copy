"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { fetchData } from "@/utils";
import { Wrapper } from "@/components/templates/dashboard/main";
import { BannerCard, Typography, useDzUpload } from "@/components";
import { banners as defBanners } from "@/dummy_data/banners";

interface BannerProp {
  name: string;
  src: string;
}

const BannersPage = ({ params }: any) => {
  const searchParams = useSearchParams();

  const [banners, setBanners] = useState<BannerProp[] | null>(defBanners);
  const [activeIndx, setActiveIndx] = useState<number | null>(null);
  const { success, uploadField, error, filepath } = useDzUpload([
    "jpg",
    "png",
    "jpeg",
    "gif",
  ]);

  // console.log({ params });

  useEffect(() => {
    (async () => {
      try {
        let data = await fetchData(
          `/api/banner?vendor=${searchParams.get("owner") || params.vendor}`
        );
        if (data) {
          console.log({ Banners: data });
        }
      } catch (error) {
        console.log("No data in Banners ");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let data = await fetchData(
          `/api/banner?vendor=${searchParams.get("owner") || params.vendor}`
        );
        if (data) {
        }
      } catch (error) {
        console.log("No data in Banners ");
      }
    })();

    if (success) {
      // alert(filepath)
      setBanners((old) => {
        let bnrs = old as BannerProp[];
        bnrs[activeIndx!].src = `${filepath}`;
        return bnrs;
      });
      setActiveIndx(null);
    }
  }, [filepath, success, activeIndx]);

  const handleActiveIndx: any = (indx: number) => {
    setActiveIndx(indx);
  };

  // if (banners?.length) return <div>No data</div>
  return (
    <Wrapper className="relative">
      {/* Headers */}
      <div className="px-3 py-2">
        <Typography variant="h4">Carousel Banners</Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {banners?.map((banner, indx: number) => (
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
