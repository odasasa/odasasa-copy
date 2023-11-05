"use client";
import { VendorHeader } from "@/components";
import { banners as defBanners } from "@/dummy_data/banners";
import Carousel from "@/components/organisms/Carousel";
import { ShoppingCartNotification } from "@/components/templates/Shop";
import Products from "@/components/templates/Shop/ProductPage";
import { useFetch } from "@/hooks";
import { useState } from "react";
import { defProducts } from "@/dummy_data/products";
import { notFound } from "next/navigation";

export default function VendorHome({ params: { vendor } }: any) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data: vendorData } = useFetch(`/api/shop/exists/?vendor=${vendor}`);
  const { data: products, error } = useFetch(`/api/product/?vendor=${vendor}`);
  const { data: fetchedBanners, error: bannerError } = useFetch(
    `/api/vendor/?vendor=${vendor}`
  );
  const { data: shopDetails } = useFetch(`/api/user/shop?vendor=${vendor}`);
  if (vendorData?.length<1) return notFound();
  // console.log({ error, products, shopDetails });

  const handleFilterByCategory = (category: string) => {
    setActiveCategory(category);
  };

  const heroBanners = Array.isArray(fetchedBanners)
    ? fetchedBanners
    : defBanners;

  return (
    <div className="w-full flex flex-col  shadow-xl relative max-w-7xl mx-auto ">
      <VendorHeader>
        <ShoppingCartNotification />
      </VendorHeader>

      <p className="mt-20"></p>
      <Carousel images={heroBanners} />

      <Products
        products={
          Array.isArray(products) && products.length > 0
            ? products
            : defProducts
        }
        handleFilterByCategory={handleFilterByCategory}
        activeCategory={activeCategory}
        shopDetails={shopDetails}
      />
    </div>
  );
}
