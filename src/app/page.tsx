import { AuthNav, VendorHeader } from "@/components"

export default function Home() {
  return (
    <div className="w-full flex flex-col  ">
      <VendorHeader 
      logoImageSrc={'/assets/logo-default.png'}
      >
        <AuthNav />
      </VendorHeader>
      <p  className="mt-30">Comming soon ....</p>
    </div>
  )

}
