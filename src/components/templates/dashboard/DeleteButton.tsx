import { Typography } from "@/components";
import { FaTrash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps{
    className?:string;
   
   iconClasses?:string
   
}

const DeleteButton = ({className =""}:DeleteButtonProps) => {
  return (
    <button className={twMerge("bg-transparent hover:bg-dashboard-red rounded-md outline outline-dashboard-red", className)}>
        <FaTrash />
    
    </button>
  )
}

export default DeleteButton