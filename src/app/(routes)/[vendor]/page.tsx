"use client"
import { Img, Logo, Select, Typography } from "@/components";
import Carousel from "@/components/organisms/Carousel";
import { products as prods } from "@/dummy_data/products";
import { extraProductCategories } from "@/utils/key_functions";
import { useEffect, useState } from "react";

// const image = "http://127.0.0.1:3000/assets/vendors/vendor/avocado.jpg"

export default function VendorHome({ params: { vendor } }: any) {

    const [products, setProducts] = useState(prods)
    const [category, setCategory] = useState<string>("")

    useEffect(() => {

        setProducts(oldProd => {
            if (category) return [
                ...oldProd.filter((p: any) => p.category == category)
            ]
            return oldProd
        })

    }, [category])


    return <div className="flex flex-col  shadow-xl relative" >
        <header className="bg-white h-20 flex justify-between fixed w-full z-20 ">
            {/* <Logo LOGO_PIC={`/assets/vendors/${vendor}/logo.png` || `/assets/vendors/vendor/logo.jpg`} /> */}
            <div className="w-1/5">
            <Logo LOGO_PIC={`/vendors/vendor/logo.jpg`} className="justify-self-start" />

            </div>
            {/* <Typography variant="h1" className="text-black text-4xl md:text-5xl lg:text-7xl font-bold md:font-extrabold">{vendor}</Typography> */}


        </header>

        {/* <div className="w-full min-h-[400px] bg-slate-500  flex justify-center items-center mt-20">
            <span>Banner Goes Here</span>   </div>*/}
            <p className="mt-20"></p>
            <Carousel 
            
            images={[
                {
                    id:'1',
                    src:"/vendors/vendor/b1.jpg",
                    alt:"banner 1"
                },
                {
                    id:'1',
                    src:"/vendors/vendor/b2.jpeg",
                    alt:"banner 2"
                },
                {
                    id:'1',
                    src:"/vendors/vendor/b3.jpeg",
                    alt:"banner 3"
                }
            ]}
            
            />
      


        <div className="flex  flex-col">
            {/*  Products Filter*/}
            <Select
                className="mx-2"
                value="" options={[{ label: "All Categories", value: "" }, ...extraProductCategories(products)]}
                placeholder={"All Categories"}
                onChange={(value) => { setCategory(value); console.log({ value }) }}
            />
            {/*  Products Grid*/}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-4">
                {products.map(p => <div key={p.title} className="w-full flex flex-col gap-2 aspect-w-2 aspect-h-1 shadow-2xl border bg-slate-100 px-3 py-2" >
                    <div className="w-full flex mb-1">
                        <div className="w-1/2 flex justify-center items-center h-full">
                            <Img src={`/vendors/vendor/avocado.jpg`}
                                alt={`${p.img?.split('.')[0]} Image`}
                                className=""
                            />
                            {/* <Img src={`/vendors/vendor/${p.img}`}  alt={`${p.img?.split('.')[0]} Image`} /> */}
                        </div>
                        <div className="w-1/2 flex flex-col px-2 gap-2">
                            <h2 className="text-product-gold font-bold text-2xl">{p.title}</h2>
                            <span className="text-black font-bold">Ksh. {p.price}</span>
                            <hr className="w-full text-red-600 border border-t-2"/>
                            <p className="text-gray-600 font-light">{p.unit}</p>
                            <p className="text-gray-600 font-light">{p.description}</p>
                        </div>
                    </div>
                    <div className="w-full ">
                        <button className="mx-auto w-full px-8 py-3 bg-product-blue text-white hover:opacity-75 transition duration-75">Add To Cart</button>
                    </div>
                </div>)}
            </div>

        </div>



    </div>
}

