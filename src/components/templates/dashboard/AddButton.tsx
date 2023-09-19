"use client"
import { twMerge } from "tailwind-merge";

interface AddButtonProps {
  className?: string;
  children?: React.ReactNode
  label?: string
  labelClasses?: string
  iconClasses?: string
  onClick?: () => void

}

const AddButton = ({ label, className = "", onClick = () => '' }: AddButtonProps) => {
  return (
    <button className={twMerge("flex ", className)} onClick={() => onClick}>
      +{" " + label}
    </button>
  )
}

export default AddButton