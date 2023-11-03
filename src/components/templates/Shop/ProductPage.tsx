import React, { useEffect, useState } from "react";
import ShoppingCart from "./ShoppingCart";

import { Select } from "@/components";
import { extraProductCategories } from "@/utils/key_functions";
import Modal from "@/components/molecules/Modal";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { useGlobalContext } from "@/context/GlobalContext";
import { handleAddToCart } from "@/utils/shoppingCartFuctions";




export default function Products({
  products,
  handleFilterByCategory,
  activeCategory,
 shopDetails
}: any) {
  const { data: globalData, setData } = useGlobalContext(),
    { shoppingCart: cartItems, isModalOpen } = globalData;


  const handleToggleCartVisibility = () => {
    setData({
      ...globalData,
      isModalOpen: !isModalOpen,
    });
  };
/*
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
*/
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
              globalData = {globalData}
               setData = {setData}
            />
          ))}
        </div>
      </div>

      {/* Shopping cart here */}
      <Modal isOpen={isModalOpen} onClose={() => handleToggleCartVisibility()}>
        <ShoppingCart
          shopDetails={shopDetails}
          // items={cartItems}
          //     onItemRemove={handleRemoveFromCart}
          // onItemIncrement={handleIncrementItem}
          // onItemDecrement={handleDecrementItem}
        />
      
      </Modal>
    </>
  );
}
