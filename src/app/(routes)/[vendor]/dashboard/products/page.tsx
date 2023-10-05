"use client"
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { Wrapper } from "@/components/templates/dashboard/main";
import { Category, Product } from "@/types";
import { fetchData } from "@/utils";
import { strCapitalize } from "@/utils/str_functions";
import AddProductModal from "./AddProductModal";
import { ProductPageWrapper } from "./ProductPageWrapper";
import { DeleteButton } from "@/components";
import { useEffect, useState } from "react";

export default  function ProductPage({ params }: any) {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])


  useEffect(() => {

    (async () => {
      try {
        const [fectchedCategories, fetchProducts] = await Promise.all([
          fetchData(`/api/category?vendor=${params?.vendor}`),
          fetchData(`/api/product?vendor=${params?.vendor}`)
        ]);

        setCategories(fectchedCategories)
        setProducts(fetchProducts)
      } catch (error: any) {
        console.log({ error: error.message })
      }

    })()
  })

  if (!products) return <div>No products</div>;
  return (
    <ProductPageWrapper>
      <Wrapper shouldAddBtn={true}>
        {/* Headers */}

        <div className="w-full grid grid-cols-10 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 mx-1 text-sm">
          <span className="overflow-hidden">#</span>
          <span className="overflow-hidden">Image</span>
          <span className="overflow-hidden">Name</span>
          <span className="overflow-hidden ">Category</span>
          <span className="overflow-hidden col-span-2">Description</span>
          <span className="overflow-hidden">Unit</span>
          <span className="overflow-hidden">Price</span>
          <span className="overflow-hidden">Status</span>
          <span className="overflow-hidden">Edit</span>
        </div>

        {products.map((p: Product, indx: number) => (
          <div
            key={`${p._id}-${indx}`}
            className="w-full overflow-x-hidden grid grid-cols-10 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
          >
            <span className="overflow-hidden">{indx + 1}</span>
            <span className="overflow-hidden">Image Here</span>
            <span className="overflow-hidden">{p.name}</span>
            <span className="overflow-hidden">{p.category}</span>
            <span className="overflow-hidden col-span-2 text-clip ">
              {p.description}
            </span>
            <span className="overflow-hidden">{p.units}</span>
            <span className="overflow-hidden">{p.price}</span>
            <span
              className={`overflow-hidden flex justify-center items-center`}
            >
              {" "}
              <span
                className={`p-1 rounded-full mx-1 ${p.status.toLowerCase().includes("active")
                  ? "bg-green-300"
                  : "bg-red-400"
                  }`}
              ></span>
              {" " + strCapitalize(p.status)}
            </span>
            <div className="flex justify-between items-center ">
              <button className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md">
                {" "}
                <FaEdit className="text-lg text-orange-400" />
              </button>
              {/* <button className="border-2 border-solid border-red-400 px-2 py-2 rounded-md">
                {" "}
                <FaTrashAlt className="text-lg text-red-400" />
              </button> */}
              <DeleteButton id={p._id!} table="product" />
            </div>
          </div>
        ))}
        <AddProductModal categories={categories} />
      </Wrapper>
    </ProductPageWrapper>
  );
}
