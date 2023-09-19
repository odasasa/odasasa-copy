"use client";

import { banners } from "@/dummy_data/banners";
import { Banners } from "@/types";
import { User } from "@/types/core";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Data =
  | {
      user: User | null;
      banners: Banners[];
    }
  ;

interface ContextProps {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const GlobalContext = createContext<ContextProps>({
  data: {
    user: null,
    banners: [],
  },
  setData: (): any => {user:null}
});

export const GlobalContextProvider = ({children}:{children:any}) => {
  const [data, setData] = useState<Data>({
    user: null,
    banners: [],
  });

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = ()=>useContext(GlobalContext)