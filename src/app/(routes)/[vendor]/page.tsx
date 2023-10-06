"use client";
import {

  VendorHeader,
} from "@/components";
import Carousel from "@/components/organisms/Carousel";
import { ShoppingCartNotification } from "@/components/templates/Products";
import Products from "@/components/templates/Products/ProductPage";
import { products as prods } from "@/dummy_data/products";
import { useFetch } from "@/hooks";
import { useEffect, useState } from "react";

export default function VendorHome({ params: { vendor } }: any) {

  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data:products, error } = useFetch(`/api/product/?vendor=${vendor}`);
  console.log({ error, products });

  const handleFilterByCategory = (category: string) => {
    setActiveCategory(category);
  };
 

  return (
    <div className="w-full flex flex-col  shadow-xl relative">
      <VendorHeader>
        <ShoppingCartNotification />
      </VendorHeader>

      <p className="mt-20"></p>
      <Carousel
        images={[
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
        ]}
      />

      <Products
        products={Array.isArray(products)? products: []}
        handleFilterByCategory={handleFilterByCategory}
        activeCategory={activeCategory}
      />
    </div>
  );
}
