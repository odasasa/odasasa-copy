"use client";
import { VendorHeader } from "@/components";
import Carousel from "@/components/organisms/Carousel";
import { ShoppingCartNotification } from "@/components/templates/Shop";
import Products from "@/components/templates/Shop/ProductPage";
import { useFetch } from "@/hooks";
import { useEffect, useState } from "react";

export default function VendorHome({ params: { vendor } }: any) {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data: products, error } = useFetch(`/api/product/?vendor=${vendor}`);
  const { data: fetchedBanners, error: bannerError } = useFetch(
    `/api/vendor/?vendor=${vendor}`
  );
  const { data: shopDetails } = useFetch(
    `/api/user/shop?vendor=${vendor}`
  );

  console.log({ error, products, shopDetails });

  const handleFilterByCategory = (category: string) => {
    setActiveCategory(category);
  };

  const heroBanners = Array.isArray(fetchedBanners)
    ? fetchedBanners
    : [
        {
          id: "1",
          src: "/vendors/vendor/b1.jpg",
          alt: "banner 1",
        },
        {
          id: "1",
          src: "/vendors/vendor/b2.jpeg",
          alt: "banner 2",
        },
        {
          id: "1",
          src: "/vendors/vendor/b3.jpeg",
          alt: "banner 3",
        },
      ];

  return (
    <div className="w-full flex flex-col  shadow-xl relative max-w-7xl mx-auto ">
      <VendorHeader>
        <ShoppingCartNotification />
      </VendorHeader>

      <p className="mt-20"></p>
      <Carousel images={heroBanners} />

      <Products
        products={Array.isArray(products) ? products : []}
        handleFilterByCategory={handleFilterByCategory}
        activeCategory={activeCategory}
        shopDetails = {shopDetails}
      />
    </div>
  );
}
