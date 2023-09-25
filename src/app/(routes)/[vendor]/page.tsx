"use client";
import {
  AuthNav,
  Img,
  Logo,
  Select,
  Typography,
  VendorHeader,
} from "@/components";
import Carousel from "@/components/organisms/Carousel";
import { ShoppingCartNotification } from "@/components/templates/Products";
import Products from "@/components/templates/Products/ProductPage";
import { products as prods } from "@/dummy_data/products";
import { useFetch } from "@/hooks";
import { extraProductCategories } from "@/utils/key_functions";
import { useEffect, useState } from "react";

// const image = "http://127.0.0.1:3000/assets/vendors/vendor/avocado.jpg"

export default function VendorHome({ params: { vendor } }: any) {
  const [products, setProducts] = useState(prods);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const { data, error } = useFetch(`/api/product/?vendor=${vendor}`);
  console.log({ error, data });

  const handleFilterByCategory = (category: string) => {
    setActiveCategory(category);
  };
  useEffect(() => {}, [products]);

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
        products={products}
        handleFilterByCategory={handleFilterByCategory}
        activeCategory={activeCategory}
      />
    </div>
  );
}
