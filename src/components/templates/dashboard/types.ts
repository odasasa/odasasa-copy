import React from "react";

export interface SidebarNavProps{
    navItems:{title:string, href:string}[],
    className?:string,
    children?:React.ReactNode
}



