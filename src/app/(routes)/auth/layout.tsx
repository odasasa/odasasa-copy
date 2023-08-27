
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full h-fit min-h-screen flex flex-col justify-center items-center bg-slate-200'>
            {children}
        </div>
    )
}
