import { twMerge } from "tailwind-merge";

interface SidebarProps{
    className?:string;
    children?:React.ReactNode
}

const Sidebar = ({children, className =""}:SidebarProps) => {
  return (
    <div className={twMerge("flex flex-col bg-dashboard-blue text-white min-w-1/4", className)}>
        {children}
    </div>
  )
}

export default Sidebar