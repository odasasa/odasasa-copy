"use client";

import { RecentVendors, Typography } from "@/components";
import { Wrapper } from "@/components/templates/dashboard/main";
import { useGlobalContext } from "@/context/GlobalContext";
import { useFetch } from "@/hooks";
import LocalStorageManager from "@/utils/localStorage";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function DashboardLandingPage(props: any) {
  const { data, setData } = useGlobalContext();
  let user = data.user || LocalStorageManager.get("user");
  const { data: fetchedData } = useFetch(
    "/api/dashboard?vendor=" + user.vendor
  );

  const colors = ["orange", "green", "red", "blue"];

  let panels = fetchedData as {
    [key: string]: string;
  };
  if (!Object.keys(panels)) return <div>Loading ....</div>;

  if (!["su", "admin"].includes(user.role)) {
    let { fetchedVendors, ...others } = panels;
    panels = others;
  }

  return (
    <Wrapper>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          Object.keys(panels).length > 3 ? "md:grid-cols-4" : "md:grid-cols-3"
        } gap-2 mid:gap-6 `}
      >
        {Object.entries(panels).map((item, indx) => (
          <Link
            href={`/${user.vendor}/dashboard/${item[0]
              .substring(7)
              .toLowerCase()}`}
            key={indx}
            className={twMerge(
              "bg-orange-500 ",
              `flex flex-col justify-center items-center text-white shadow-lg rounded-lg bg-${colors[indx]}-500 px-8 py-4 `
            )}
          >
            <Typography variant="p" className="mb-1 pb-0">
              {" "}
              {item[0].substring(7)}
            </Typography>
            <Typography variant="h4" className="my-0 py-0">
              {" "}
              {item[1]}
            </Typography>
          </Link>
        ))}
      </div>

      <div className="w-full flex pt-5">
        <div className="w-full md:w-1/2">
          <RecentVendors />
          hello
        </div>

        <div className="w-full md:w-1/2">
          hell 2
        </div>
      </div>
    </Wrapper>
  );
}
