"use client";

import { Banners, Category } from "@/types";
import { GlobalData, User } from "@/types/core";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface ContextProps {
  data: GlobalData;
  setData: Dispatch<SetStateAction<GlobalData>>;
}

const initialData: GlobalData = {
  user: null,
  categories: [],
  banners: [],
  shoppingCart: [],
  order: null,
  isModalOpen: false,
  uploadedImgPath: ""
};

const GlobalContext = createContext<ContextProps>({
  data: initialData,
  setData: (): any => {
    user: null;
  },
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState<GlobalData>(initialData);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext: any = () => useContext(GlobalContext);
