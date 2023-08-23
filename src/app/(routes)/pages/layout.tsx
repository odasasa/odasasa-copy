import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Landing Pages',
    description: 'Home for all your business needs',
}

export default function LandingPagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full h-screen'>
            {children}
        </div>
    )
}
