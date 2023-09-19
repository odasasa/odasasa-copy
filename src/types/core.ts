import { ReactNode } from "react";

export interface User {
    _id?: string;
    name: string;
    email: string;
    idNumber: string;
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