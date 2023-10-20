"use client";
import { DeleteButton } from "@/components";
import { useFetch } from "@/hooks";
import { strCapitalize } from "@/utils";
import { User } from "@/types/core";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function VendorsPage({ params }: any) {
  const [vendors, setVendors] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedVendors = await (
          await fetch(`/api/user?vendor=${params.vendor}`)
        ).json();
        setVendors(
          fetchedVendors.filter((v: any) => !["su", "admin"].includes(v.role))
        );
        console.log({ fetchedVendors });
      } catch (error) {
        console.log({ error });
      }
    })();
  });
  if (!Array.isArray(vendors) || vendors.length < 1)
    return (
      <div className="flex justify-center items-center m-10 mx-4">
        {" "}
        No vendors
      </div>
    );
  return (
    <>
      <div className="w-full overflow-x-hidden grid grid-cols-5 mid:grid-cols-7 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm font-bold bg-[#f9f9ff] ">
        <span className="">#</span>
        <span>Business Name</span>
        <span>Business Code</span>
        <span>Status</span>
        <span>Operation</span>
      </div>
      {vendors.map((currentVendor: any, indx: number) => (
        <Link
          // href={`/${currentVendor.vendor}/dashboard?owner=${params.vendor}`}
          href={`/${params.vendor}/dashboard?owner=${currentVendor.vendor}`}
          key={`${currentVendor._id}-${indx}`}
          className="w-full overflow-x-hidden grid grid-cols-5 mid:grid-cols-7 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
        >
          <span className="overflow-hidden p-3">{indx + 1}</span>

          <span className=" hidden md:flex overflow-x-hidden">
            {strCapitalize(currentVendor.businessName)}
          </span>

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
              className="border-2 border-solid border-orange-400 p-2 rounded-md"
              onClick={() => {
                // setData({ ...globalData, isModalOpen: !isModalOpen });
              }}
            >
              {" "}
              <FaEdit className="text-lg text-orange-400" />
            </button>
            <DeleteButton id={currentVendor._id!} table="category" />
          </div>
        </Link>
      ))}
    </>
  );
}
