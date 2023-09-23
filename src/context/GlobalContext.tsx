"use client";

import { banners } from "@/dummy_data/banners";
import { Banners } from "@/types";
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
    pickupPoint: string;
  };
  cart: CartProduct[];
};

type Data = {
  user: User | null;
  banners: Banners[];
  shoppingCart: CartProduct[];
  order: Order;
  isCartOpen: boolean;
};

interface ContextProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const initialData: Data = {
  user: null,
  banners: [],
  shoppingCart: [],
  order: null,
  isCartOpen: false,
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

export const useGlobalContext :any = () => useContext(GlobalContext);
