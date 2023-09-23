import React, { useEffect, useState } from 'react';
import ShoppingCart from './ShoppingCart';
import { CartItem } from './types';
import { Img, Select } from '@/components';
import { extraProductCategories } from '@/utils/key_functions';
import Modal from '@/components/molecules/Modal';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function Products({ products, handleFilterByCategory,activeCategory }: any) {
  const initialCartItems: CartItem[] = [
   

  ];


  const [toggleModal, setToggleModal] = useState(false)

  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);



  const closeModal = () => setToggleModal(false)
  const openModal = () => setToggleModal(true)

  const handleAddToCart = (item: { title: string, price: number, unit?: string }) => {
    const productIndex = cartItems.findIndex((p: any) => p.name == item.title);
    if (productIndex === -1) {
      return setCartItems(oldItems => [
        ...oldItems, {
          name: item.title,
          quantity: 1,
          price: item.price
        }
      ]
      )
    }
    //Increment Item


    setCartItems(oldItems => {
      const updatedItems = oldItems;
      updatedItems[productIndex].quantity += 1

      return updatedItems
    }
    )


  }

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const incrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const decrementItem = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };




  useEffect(() => {
    console.log({ cartItems })
  }, [cartItems, toggleModal]);


  return (
    <>

      <div className="w-full flex  flex-col">
        {/*  Products Filter*/}
        <Select
          className="mx-2"
          value="" options={[{ label: "All Categories", value: "" }, ...extraProductCategories(products)]}
          placeholder={"All Categories"}
          onChange={(selectedCategory) => handleFilterByCategory(selectedCategory)}
        />
        {/*  Products Grid*/}

        <div className="w-[96vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2">

          {(activeCategory? products.filter((p:any)=>p.category === activeCategory) : products).map((prod: Product, indx: number) => <ProductCard key={indx} product={prod} handleAddToCart={handleAddToCart} />)}
        </div>

      </div>

      {/* Shopping cart here */}
      <Modal isOpen={toggleModal} onClose={closeModal}>
        <ShoppingCart
          items={cartItems}
          onItemRemove={removeFromCart}
          onItemIncrement={incrementItem}
          onItemDecrement={decrementItem}
        />
      </Modal>
    </>
  );
}

