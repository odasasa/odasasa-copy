"use client";

import { Wrapper } from "@/components/templates/dashboard/main";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default  function Page(props: any) {
//   const{data, setData} = useGlobalContext()
//   const router = useRouter();
//  if(!data.user) return router.replace("/auth/login")
// console.log({data, loc:"dash->pg"})
  const colors = [
    'orange',
    'green',
    'red',
    'blue'
  ]
  const colors1 = [
    'bg-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-blue-500'
  ]

  return (
    <Wrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mid:6 ">
        {["vendors", "products", "categories", "orders"].map((item, indx) => (
          <div
            key={indx}
            className={twMerge(`flex flex-col justify-center items-center text-white shadow-lg rounded-lg bg-${colors[indx]}-500 px-8 py-4 `)}
          >{item}</div>
        ))}
      </div>
    </Wrapper>
  );
}
