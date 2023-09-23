import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";

import {  Select } from "@/components";
import { extraProductCategories } from "@/utils/key_functions";
import Modal from "@/components/molecules/Modal";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { useGlobalContext } from "@/context/GlobalContext";

const customerFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "PickUp Point", name: "location", type: "text" },
];

export default function Products({
  products,
  handleFilterByCategory,
  activeCategory,
}: any) {
  const { data, setData } = useGlobalContext(),
    { shoppingCart: cartItems, isCartOpen } = data;

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
      ...data,
      isCartOpen: !isCartOpen,
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
        ...data,
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
      ...data,
      shoppingCart: updatedItems,
    });
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setData({
      ...data,
      shoppingCart: updatedCart,
    });
  };

  const incrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setData({
      ...data,
      shoppingCart: updatedCart,
    });
  };

  const decrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      if (updatedCart[index].quantity < 1) updatedCart.splice(index, 1);

      setData({
        ...data,
        shoppingCart: updatedCart,
      });
    }
  };

  useEffect(() => {
    console.log({ cartItems });
  }, [cartItems]);

  return (
    <>
      <div className="w-full flex  flex-col">
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

        <div className="w-[96vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">
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
      <Modal isOpen={isCartOpen} onClose={() => handleToggleCartVisibility()}>
        <div className="px-6 w-full">
          {cartItems.length > 0 &&
            customerFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  onChange={handleChange}
                  required ={true}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
        </div>
        <ShoppingCart
          items={cartItems}
          customer={formData}
          onItemRemove={removeFromCart}
          onItemIncrement={incrementItem}
          onItemDecrement={decrementItem}
        />
      </Modal>
    </>
  );
}
