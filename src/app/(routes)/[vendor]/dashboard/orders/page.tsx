"use client";

import { DynamicTable, Orders } from "@/components";
import { useFetch } from "@/hooks";

import { useSearchParams } from "next/navigation";

export default function OrderPage({ params }: any) {
  const searchParams = useSearchParams();
  const { data: orders, error } = useFetch(
    `/api/order?vendor=${searchParams.get("owner") || params.vendor}`
  );
  if (!Array.isArray(orders))
    return (
      <div className="flex justify-center items-center m-10"> No orders</div>
    );
  return (
    <div>
      <h2>Table is here</h2>
      <DynamicTable
        columns={[
          { label: "Vendor", field: "vendor" },
          { label: "Products", field: "items" },
          { label: "CreatedAt", field: "created_at", type: "date" },
          { label: "Customer", field: "customer" },
          // { label: "Picking Point", field: "location" },
          { label: "Status", field: "status" },
        ]}
        data={(orders ?? []).map((p) => {
          return {
            ...p,
            customer: `${p.customer.name},
            ${p.customer.phone},
            ${p.customer.location} 
            `,
            location: p.customer.location,
            items: p.cart.map((p: any) => p.name).join(", "),
          };
        })}
        table="order"
      />
    </div>
  );
}
