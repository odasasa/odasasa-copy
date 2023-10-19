"use client";
import { DeleteButton } from "@/components";
import { useFetch } from "@/hooks";
import { strCapitalize } from "@/utils";
import { User } from "@/types/core";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Vendors({ params }: any) {
  const [vendors, setVendors] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVendors = await (
          await fetch(`/api/user?vendor=${params.vendor}`)
        ).json();
        setVendors(fetchedVendors);
      } catch (error) {
        console.log({ error });
      }
    })();
  });
  if ( !Array.isArray(vendors) || vendors.length > 0  )
    return (
      <div className="flex justify-center items-center m-10"> No vendors</div>
    );
  return (
    <>
      {vendors.filter(vendor=>!['su','admin'].includes(vendor.role)).map((currentVendor: any, indx: number) => (
        <div
          key={`${currentVendor._id}-${indx}`}
          className="w-full overflow-x-hidden grid grid-cols-4 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
        >
          <span className="overflow-hidden">{indx + 1}</span>

          <span className="overflow-hidden col-span-2">{currentVendor.businessName}</span>

          <span className="overflow-hidden ">{currentVendor.vendor}</span>

          <span className={`overflow-hidden flex justify-center items-center`}>
            {" "}
            <span
              className={`p-1 rounded-full mx-2 ${
                currentVendor.status ? "bg-green-300" : "bg-red-400"
              }`}
            ></span>
            {" " + strCapitalize(currentVendor.status ? "Active" : "Inactive")}
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
            <DeleteButton id={currentVendor._id!} table="category" />
          </div>
        </div>
      ))}
    </>
  );
}
