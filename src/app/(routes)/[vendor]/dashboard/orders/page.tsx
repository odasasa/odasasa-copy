"use client";
import { DeleteButton } from "@/components";
import { useFetch } from "@/hooks";
import { strCapitalize } from "@/utils";
import { useSearchParams } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function OrderPage({ params }: any) {
  const searchParams = useSearchParams();
  const { data: orders, error } = useFetch(
    `/api/orders?vendor=${searchParams.get("owner") || params.vendor}`
  );
  if (!Array.isArray(orders))
    return (
      <div className="flex justify-center items-center m-10"> No orders</div>
    );
  return (
    <>
      {orders.map((currentOrder: any, indx: number) => (
        <div
          key={`${currentOrder._id}-${indx}`}
          className="w-full overflow-x-hidden grid grid-cols-4 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
        >
          <span className="overflow-hidden">{indx + 1}</span>

          <span className="overflow-hidden">{currentOrder.name}</span>

          {/* <span className="overflow-hidden">{currentOrder.units}</span> */}

          <span className={`overflow-hidden flex justify-center items-center`}>
            {" "}
            <span
              className={`p-1 rounded-full mx-1 ${
                currentOrder.status.toLowerCase().includes("active")
                  ? "bg-green-300"
                  : "bg-red-400"
              }`}
            ></span>
            {" " + strCapitalize(currentOrder.status)}
          </span>
          <div className="flex justify-between items-center ">
            <button
              className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md"
              onClick={() => {
                // setData({ ...globalData, isModalOpen: !isModalOpen });
              }}
            >
              {" "}
              <FaEdit className="text-lg text-orange-400" />
            </button>
            <DeleteButton id={currentOrder._id!} table="category" />
          </div>
        </div>
      ))}
    </>
  );
}
