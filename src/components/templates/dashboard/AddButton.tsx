import { Typography } from "@/components";
import { twMerge } from "tailwind-merge";

interface AddButtonProps{
    className?:string;
   children:React.ReactNode
   label?: string
   labelClasses?:string
   iconClasses?:string
   
}

const AddButton = ({label,className =""}:AddButtonProps) => {
  return (
    <button className={twMerge("flex ", className)}>
        <Typography variant="h3" className={twMerge(" ", className)}>+</Typography>
        <Typography variant="h3" className={twMerge("", className)}>{label}</Typography>
    </button>
  )
}

export default AddButton