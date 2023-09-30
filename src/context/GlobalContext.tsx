"use client";

import { Banners, Category } from "@/types";
import { User } from "@/types/core";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type CartProduct = {
  name: string;
  quantity: number;
  price: number;
  id?: string;
};

type Order = null | {
  customer: {
    name: string;
    phone: string;
    location: string;
  };
  cart: CartProduct[];
};

type Data = {
  user: User | null;
  categories: Category[];
  banners: Banners[];
  shoppingCart: CartProduct[];
  order: Order;
  isModalOpen: boolean;
  uploadedImgPath?:string
};

interface ContextProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const initialData: Data = {
  user: null,
  categories: [],
  banners: [],
  shoppingCart: [],
  order: null,
  isModalOpen: false,
  uploadedImgPath:""
};

const GlobalContext = createContext<ContextProps>({
  data: initialData,
  setData: (): any => {
    user: null;
  },
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState<Data>(initialData);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext: any = () => useContext(GlobalContext);
