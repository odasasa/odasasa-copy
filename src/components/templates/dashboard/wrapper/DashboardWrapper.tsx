"use client";
import {
  AuthNav,
  Button,
  DashboardAuthNav,
  Sidebar,
  SidebarNav,
  VendorHeader,
} from "@/components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function DashboardWarrper({
  params,
  children,
}: {
  params: any;
  children: React.ReactNode;
}) {
  const [navHeaderTitle, setNavHeaderTtitle] = useState("");
  const vendor = params.vendor;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {}, [navHeaderTitle]);

  return (
    <div className="w-full flex flex-col">
      <VendorHeader logoImageSrc={"/assets/logo-default.png"} className="">
        {/* This holds the notification bell and ther avator icon */}
        <DashboardAuthNav className="" />
      </VendorHeader>
      {/*  */}
      <div className="mt-20 w-full flex flex-col sm:flex-row bg-dpage-gray ">
        <Sidebar className="text-white" vendor={navHeaderTitle || vendor}>
          <SidebarNav
            navItems={[
              { title: "Dashboard", href: "" },
              { title: "Categories", href: "categories" },
              { title: "Products", href: "products" },
              { title: "Banners", href: "banners" },
              { title: "Orders", href: "orders" },
              { title: "Account", href: "account" },
            ]}
            baseUrl={`/${vendor}/dashboard`}
          />
        </Sidebar>
        {/* Page roote */}
        <div
          className={`w-full sm:flex-1  mx-8 my-4 flex flex-col ${
            pathname.includes("banners") ? "" : "bg-white"
          }  rounded-lg min-h-screen h-fit  `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
