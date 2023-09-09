"use client"
import { Sidebar, SidebarNav, Typography, VendorHeader } from '@/components';
import type { Metadata } from 'next'
import Link from 'next/link';
import { usePathname } from 'next/navigation'


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


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const vendor = 'mds'


  return (

    <div className='w-full flex flex-col'>
      <VendorHeader >
        <div className="flex justify-between items-center w-1/12">
          {/* Search box */}
          <input placeholder='Search ...'
            // onChange={(e)=>console.log(e.target.value)}

            className='rounded-ld px-6 py-3 outline-2 outline-sold outline-slate-200'
          />
        </div>
      </VendorHeader>
      {/*  */}
      <div className='mt-20 w-full flex bg-dpage-gray '>

        <Sidebar>
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
        <div className='flex-1  mx-8 my-4 flex flex-col  bg-white rounded-lg h-screen min-h-fit '>
        {children}
        </div>
        
      </div>

    </div>

  )
}
