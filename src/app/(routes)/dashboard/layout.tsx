"use client";
import { DashboardWrapper } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";
import LocalStorageManager from "@/utils/localStorage";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

const metadata: Metadata = {
  title: "Odasasa ",
  description: `${"Odasasa"} official website`,
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function DashboardLayout({
  params,
  children,
}: {
  params: any;
  children: React.ReactNode;
}) {
  const { data, setData } = useGlobalContext();
  const router = useRouter();
  let user = data.user || LocalStorageManager.get("user");
  // if (!LocalStorageManager.get("user")) return router.replace("/auth/login");
  if (!user) return router.replace("/auth/login");

  return <DashboardWrapper params={params}>{children}</DashboardWrapper>;
}
