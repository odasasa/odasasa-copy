import { Logo } from '@/components';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';



interface VendorHeaderProps {
    className?: string
    children?: ReactNode
    logoImageSrc?: string | null
}

export default function VendorHeader({ children, className, logoImageSrc }: VendorHeaderProps) {
    return <header className={twMerge("bg-white h-20 flex justify-between fixed w-full z-20 ", className)}>
        <div className="w-1/5">
            <Logo LOGO_PIC={logoImageSrc || `/vendors/vendor/logo.jpg`} className="justify-self-start" />

        </div>
        {children}
    </header>
}