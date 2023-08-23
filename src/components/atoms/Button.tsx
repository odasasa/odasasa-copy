"use client"
import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  type?: "reset" | "submit" | "button"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  type = "button"
}) => (
  <button
    className={` bg-skin-primary text-white font-bold p-4 px-8 rounded hover:border-2 hover:border-white  hover:border-solid hover:rounded text-base ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;
