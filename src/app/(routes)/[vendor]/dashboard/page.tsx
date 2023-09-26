"use client";

import { Wrapper } from "@/components/templates/dashboard/main";
import { useGlobalContext } from "@/context/GlobalContext";
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Page(props: any) {
  const { data, setData } = useGlobalContext();
  let user =data.user || LocalStorageManager.get('user')

  const colors = ["orange", "green", "red", "blue"];
  const colors1 = [
    "bg-orange-500",
    "bg-green-500",
    "bg-red-500",
    "bg-blue-500",
  ];

  return (
    <Wrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mid:6 ">
        {["vendors", "products", "categories", "orders"]
          .filter(
            (item) =>
              ["admin", "su"].includes(user?.role) && item === "vendors"
          )
          .map((item, indx) => (
            <div
              key={indx}
              className={twMerge(
                `flex flex-col justify-center items-center text-white shadow-lg rounded-lg bg-${colors[indx]}-500 px-8 py-4 `
              )}
            >
              {item}
            </div>
          ))}
      </div>
    </Wrapper>
  );
}
