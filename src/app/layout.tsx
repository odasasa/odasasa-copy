import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'MDS Landing Pages',
  description: 'Mombasa Digital Solutions - Landing Pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
