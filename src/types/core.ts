import { ReactNode } from "react";
import { Banners, Category } from ".";

export interface User {
    _id?: string;
    name: string;
    email: string;
    // idNumber: string;
    role: 'vendor' | 'admin' | 'su';
    createdAt: Date;
    status: string;
    phone: string;
    password: string;
    confirmPassword: string;
    businessName:string
    vendor:string
  }
 

  export interface ElementProps {
    className?: string;
   children?: ReactNode;
   
 }

 export type CartProduct = {
  name: string;
  quantity: number;
  price: number;
  id?: string;
};

export type Order = null | {
  customer: {
    name: string;
    phone: string;
    location: string;
  };
  vendor?: string
  cart: CartProduct[];
};

export type GlobalData = {
  user: User | null;
  categories: Category[];
  banners: Banners[];
  shoppingCart: CartProduct[];
  order: Order;
  isModalOpen: boolean;
  uploadedImgPath?: string
};

