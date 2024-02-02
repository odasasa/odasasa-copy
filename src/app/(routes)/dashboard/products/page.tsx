import { DashboardProducts } from "@/components"


export default function ProductPage({ params }: any) {
  return <DashboardProducts  vendor={params.vendor} />
}
