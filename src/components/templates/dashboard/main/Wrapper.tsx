"use client"

import { ReactNode } from "react";
import AddButton from "../AddButton";
import { twMerge } from "tailwind-merge";


type WrapperProps = {
    className?: string;
    handleAddBtn?: () => void;
    children: ReactNode;
    shouldAddBtn?: boolean
    addBtnLabel?: string

}

export default function Wrapper({
    className = '',
    children,
    handleAddBtn = () => console.log("Hellloo from addBtn"),
    shouldAddBtn = false,
    addBtnLabel = "Product"
}: WrapperProps) {



    return <div className={twMerge(`w-full px-8 py-5 flex flex-col gap-3 overflow-hidden`, className)}>
        {
            shouldAddBtn &&
            <div className="w-full flex justify-end my-3">

                <AddButton
                    className="px-6 py-3 rounded-full bg-gradient-to-r 
                from-dashboard-btn_green to-dashboard-btn_green_end
                hover:from-dashboard-btn_green_end hover:to-dashboard-btn_green
                text-white font-bold text-lg"
                    label={addBtnLabel}
                    onClick={() => handleAddBtn()}

                />

            </div>
        }
        <div className="w-full my-2">
            {/* children go here */}
            {children}

        </div>




    </div>


}

