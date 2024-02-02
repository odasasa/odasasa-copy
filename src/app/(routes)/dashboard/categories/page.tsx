import { Categories } from "@/components";

export default function CategoriesPage({ params: { vendor } }: any) {
  return <Categories vendor={vendor} />;
}
