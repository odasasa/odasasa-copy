import { Typography } from "@/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center m-auto max-lg min-h-screen gap-8">
      <Typography variant={'h3'}>Page Not Found</Typography>
      {/* <Typography variant={'p'}>Could not find requested resource</Typography> */}
      <Link href="/" className="px-4 md:px-8 py-2 md:py-4 bg-skin-primary rounded-lg text-white">Return Home</Link>
    </div>
  );
}