import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";

import { Select } from "@/components";
import { extraProductCategories } from "@/utils/key_functions";
import Modal from "@/components/molecules/Modal";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { User } from "@/types/core";

const customerFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Location", name: "location", type: "text" },
];

export default function Products({
  products,
  handleFilterByCategory,
  activeCategory,
 shopDetails
}: any) {
  const { data: globalData, setData } = useGlobalContext(),
    { shoppingCart: cartItems, isModalOpen } = globalData;

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    location: string;
  }>({ name: "", phone: "", location: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleCartVisibility = () => {
    setData({
      ...globalData,
      isModalOpen: !isModalOpen,
    });
  };

  const handleAddToCart = (item: {
    name: string;
    price: number;
    unit?: string;
  }) => {
    const productIndex = cartItems.findIndex((p: any) => p.name == item.name);
    if (productIndex === -1) {
      return setData({
        ...globalData,
        shoppingCart: [
          ...cartItems,
          { name: item.name, quantity: 1, price: item.price },
        ],
      });
    }

    //Increment Item
    const updatedItems = cartItems;
    updatedItems[productIndex].quantity += 1;

    setData({
      ...globalData,
      shoppingCart: updatedItems,
    });
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setData({
      ...globalData,
      shoppingCart: updatedCart,
    });
  };

  const incrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setData({
      ...globalData,
      shoppingCart: updatedCart,
    });
  };

  const decrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      if (updatedCart[index].quantity < 1) updatedCart.splice(index, 1);

      setData({
        ...globalData,
        shoppingCart: updatedCart,
      });
    }
  };

  useEffect(() => {
    // console.log({ cartItems });
  }, [cartItems]);

  if (!Array.isArray(products)) return <div> The shop is empty </div>;

  return (
    <>
      <div className="w-full px-4  flex  flex-col justify-center items-center mx-auto">
        {/*  Products Filter*/}
        <Select
          className="mx-2"
          value=""
          options={[
            { label: "All Categories", value: "" },
            ...extraProductCategories(products),
          ]}
          placeholder={"All Categories"}
          onChange={(selectedCategory) =>
            handleFilterByCategory(selectedCategory)
          }
        />
        {/*  Products Grid*/}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">
          {(activeCategory
            ? products.filter((p: any) => p.category === activeCategory)
            : products
          ).map((prod: Product, indx: number) => (
            <ProductCard
              key={indx}
              product={prod}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Shopping cart here */}
      <Modal isOpen={isModalOpen} onClose={() => handleToggleCartVisibility()}>
        <ShoppingCart
          shopDetails={shopDetails}
          items={cartItems}
          customer={formData}
          onItemRemove={removeFromCart}
          onItemIncrement={incrementItem}
          onItemDecrement={decrementItem}
        />
        {/* The customer infor */}
        <div className="px-2 md:px-6 w-full">
          {cartItems.length > 0 &&
            customerFields.map((field) => (
              <div key={field.name} className="my-2 md:my-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  required={true}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
        </div>
      </Modal>
    </>
  );
}
