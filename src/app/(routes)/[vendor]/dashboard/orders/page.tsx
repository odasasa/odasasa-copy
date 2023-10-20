"use client";

import { Orders } from "@/components";
import { useFetch } from "@/hooks";

import { useSearchParams } from "next/navigation";


export default function OrderPage({ params }: any) {
  const searchParams = useSearchParams();
  const { data: orders, error } = useFetch(
    `/api/orders?vendor=${searchParams.get("owner") || params.vendor}`
  );
  if (!Array.isArray(orders))
    return (
      <div className="flex justify-center items-center m-10"> No orders</div>
    );
  return <Orders  orders = {Array.isArray(orders)? orders: []} />
}
