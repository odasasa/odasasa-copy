import { Typography } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";
import LocalStorageManager from "@/utils/localStorage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FiPower, FiSettings } from "react-icons/fi";
import { GrHome } from "react-icons/gr";

export default function ProfileLogoutModal({ vendor }: any) {
  const { data: globalData } = useGlobalContext();
  const user = globalData.user || LocalStorageManager.get("user");
  const router = useRouter();
  return (
    <ul className="w-[150px] min-h-fit  bg-slate-100 absolute top-12 right-2 border border-slate-300 border-solid shadow-lg rounded-md flex flex-col gap-4">
      <li className="hover:underline flex flex-col  items-center text-xs bg-product-blue  text-white ">
        <Typography variant="h5" className="p-0">
          Admin
        </Typography>
        <Typography variant="h6" className="p-0">
          Available
        </Typography>
      </li>
      <div className="flex flex-col gap-4 m-3">
        <Link
          href={`/${user.vendor || ""}`}
          className="hover:underline flex  items-center text-xs "
        >
          <GrHome className="mr-2" />
          Home
        </Link>
        <Link
          href={`${user.vendor ? "/" + user.vendor : ""}/dashboard/account`}
          className="hover:underline flex  items-center text-xs"
        >
          <FaUser className="mr-2 text-slate-500" />
          Account
        </Link>
        <Link
          href={`${user.vendor ? "/" + user.vendor : ""}/dashboard/account`}
          className="hover:underline flex  items-center text-xs"
        >
          <FiSettings className="mr-2" />
          Settings
        </Link>
        <span
          onClick={() => globalData.handleLogout(() => router.replace("/"))}
          className="hover:underline flex  items-center text-xs"
        >
          <FiPower className="mr-2" />
          Logout
        </span>
      </div>
    </ul>
  );
}
