import { twMerge } from "tailwind-merge"
import { SidebarNavProps } from "../types"
import Link from "next/link"


const Nav = (
    { navItems, className = "" }: SidebarNavProps
) => {
    return (
        <ul className={twMerge("w-full flex flex-col", className)}>
            {
                navItems.map((item, indx) => <li key={indx}><Link href={item.href}>{item.title}</Link></li>)
            }
        </ul>
    )
}

export default Nav