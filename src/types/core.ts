import { ReactNode } from "react";

export interface User {
    _id?: string;
    name: string;
    email: string;
    idNumber: string;
    role: string;
    createdAt: Date;
    status: string;
    phone: string;
    password: string;
    confirmPassword: string;
    businessName:string
    businessCode:string
  }
 

  export interface ElementProps {
    className?: string;
   children?: ReactNode;
   
 }