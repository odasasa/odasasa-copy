"use client";
import { DeleteButton, Typography } from "@/components";
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
          fetchedVendors.filter((v: any) => !["su", "admin"].includes(v.role)) as User[]
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
      <Typography variant="h2" className="w-full underline">
        Vendors Page
      </Typography>
      <div className="w-full overflow-x-hidden grid grid-cols-3 md:grid-cols-6 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm font-bold bg-[#f9f9ff] ">
        <span className="p-3">#</span>
        <span className="hidden md:flex">Business Name</span>
        <span>Business Code</span>
        <span className="text-center hidden md:flex">Status</span>
        <span className="hidden md:flex">Email</span>
        <span>Phone</span>
      
      </div>
      {vendors.map((currentVendor: any, indx: number) => (
        <Link
          // href={`/${currentVendor.vendor}/dashboard?owner=${params.vendor}`}
          href={`/${params.vendor}/dashboard?owner=${currentVendor.vendor}`}
          key={`${currentVendor._id}-${indx}`}
          className="w-full overflow-x-hidden grid grid-cols-3 md:grid-cols-6 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
        >
          <span className="overflow-hidden p-3">{indx + 1}</span>

          <span className=" hidden md:flex overflow-x-hidden">
            {strCapitalize(currentVendor.businessName)}
          </span>

          <span className="overflow-hidden ">{currentVendor.vendor}</span>

          <span className={`overflow-hidden hidden md:flex justify-center items-center`}>
            {" "}
            <span
              className={`p-1 rounded-full mx-2 ${
                currentVendor.status ? "bg-green-300" : "bg-red-400"
              }`}
            ></span>
            {" " + strCapitalize(currentVendor.status ? "Active" : "Inactive")}
          </span>
          <span className="hidden md:flex">{currentVendor.email}</span>
          <span>{currentVendor.phone}</span>
          
        </Link>
      ))}
    </>
  );
}
