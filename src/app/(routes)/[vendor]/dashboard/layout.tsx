"use client"
import { AuthNav, Sidebar, SidebarNav, Typography, VendorHeader } from '@/components';
import type { Metadata } from 'next'
import { usePathname } from 'next/navigation';
import { FaBell } from 'react-icons/fa';



export const metadata = {
  title: 'Odasasa ',
  description: 'Odasasa official website',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};


export default function DashboardLayout({ params,
  children,
}: {
  params: any,
  children: React.ReactNode
}) {
  const vendor = params.vendor
  const pathname = usePathname()




  return (

    <div className='w-full flex flex-col'>
      <VendorHeader >

        <div className="flex justify-between items-center w-3/12 gap-5">
          <div className="flex justify-end items-center w-2/3  ">
            {/* Search box */}
            <input placeholder='Search ...'
              // onChange={(e)=>console.log(e.target.value)}
              className='rounded-lg px-6 py-2 border-2 border-solid border-slate-600 block mx-3'
            />
          </div>
          {/*Notifications & user menu */}
          <div className='flex gap-3 w-1/3'>
            <div className="flex-1 p-3   border-solid border-l-2 border-slate-500 flex items-center justify-center"><FaBell /></div>
            <div className="flex-1 p-3  border-l-2 border-slate-500 flex items-center justify-center">
              <span className="w-10/12 bg-slate-300 rounded-full h-full aspect-square"></span>

            </div>
          </div>
        </div>
        {/* <AuthNav /> */}
      </VendorHeader>
      {/*  */}
      <div className='mt-20 w-full flex bg-dpage-gray '>

        <Sidebar className='text-white'
          vendor={vendor}
        >
          <SidebarNav
            navItems={[
              { title: "Dashboard", href: "" },
              { title: "Categories", href: "categories" },
              { title: "Products", href: "products" },
              { title: "Banners", href: "banners" },
              { title: "Orders", href: "orders" },
              { title: "Account", href: "account" },
            ]}

            baseUrl='/mds/dashboard'

          />
        </Sidebar>
        {/* Page roote */}
        <div className={`flex-1  mx-8 my-4 flex flex-col ${pathname.includes('banners') ? '' : 'bg-white'}  rounded-lg min-h-screen h-fit  `}>
          {children}
        </div>

      </div>

    </div>

  )
}
