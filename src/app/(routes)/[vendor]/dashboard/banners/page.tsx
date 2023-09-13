"use client"
import { use, useEffect, useState } from "react"
import { fetchData } from "@/utils";
import { Wrapper } from "@/components/templates/dashboard/main";
import { BannerCard, Typography, useDzUpload } from "@/components";
interface BannerProp {
    name: string
    src: string
}

async function getData(cb: any,vendor:string) {
    try {
        let data = await fetchData(`/api/banner?vendor=${vendor}`);
        if (data) {
            cb(data)
        }
    } catch (error) {
        console.log("No data in Banners ")
    }
}

import {banners as defBanners} from "@/dummy_data/banners"

const BannersPage = ({params}:any) => {
    // let data = use(fetchData('/api/banner'));
    // console.log({ data })
    const [banners, setBanners] = useState<BannerProp[] | null>(defBanners)
    const [activeIndx, setActiveIndx] = useState<number | null>(null)
    const { success, uploadField, error, filepath } = useDzUpload(['jpg', 'png', 'jpeg'])

console.log({params})

    useEffect(() => {
        if (success) {
            // alert(filepath)
            setBanners(old => {
                let bnrs = old as BannerProp[]
                bnrs[activeIndx!].src = `${filepath}`
                return bnrs
            })
            setActiveIndx(null)

        }
    }, [filepath,success])

    // // let data = use(fetchData('/api/banner'));
    // useEffect(() => {
    //     getData(setBanners,params.vendor)
    //     // setBanners(data)
    // }, [])


    const handleActiveIndx: any = (indx: number) => {

        setActiveIndx(indx)
    }

    // if (banners?.length) return <div>No data</div>
    return (
        <Wrapper
            className="relative"

        >


            {/* Headers */}
            <div className="px-3 py-2">
                <Typography variant="h4">Carousel Banners</Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {
                    banners?.map((banner, indx: number) => <BannerCard key={indx}
                        indx={indx}
                        activeIndx={activeIndx}
                        setActiveIndx={handleActiveIndx}
                        uploadField={uploadField}
                        banner={banner}

                    />

                    )
                }
            </div>


        </Wrapper>

    )

}



export default BannersPage