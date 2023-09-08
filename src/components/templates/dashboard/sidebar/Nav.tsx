"use client"
import { useState, useEffect } from 'react'
import { twMerge } from "tailwind-merge"

import { SidebarNavProps } from "../types"
import Link from "next/link"
import { usePathname } from 'next/navigation'



const Nav = (
    { navItems, className = "", baseUrl = "/dashboard" }: SidebarNavProps
) => {

    const pathname = usePathname()
  

    const [activeLink, setActiveLink] = useState<string>("")

    useEffect(() => {

    }, [activeLink]);

    const isActiveRoute = (link: string) => {
        if (link === "") {
            if (pathname.split('/')[pathname.split('/').length - 1] == 'dashboard') {
                return true;
            }

            return false;
        }

        return pathname.includes(link);
    }

    return (
        <ul className={twMerge("w-full flex flex-col gap-1", className)}>
            {
                navItems.map((item, indx: number) => <li key={indx}
                    onClick={() => setActiveLink(item.href)}
                    className={`rounded-[2px] w-full overflow-hidden ${isActiveRoute(item.href.trim()) ? 'border-l-[5px] border-solid border-white' : ''}`}
                ><Link
                    className={`w-full block px-6 py-3
                     ${isActiveRoute(item.href.trim()) ? ' bg-dashboard-nav_item_bg  bg-gradient-to-r from-dashboard-gra_start to-dashboard-gra_end' : ''}`}

                    href={`${baseUrl}/${item.href}`}>{item.title}</Link>
                </li>)
            }
        </ul>
    )
}



export default Nav