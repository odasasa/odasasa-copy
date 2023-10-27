import { postData } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

async function UserActivationPage({
  params: { tokenAndEmail },
}: {
  params: { tokenAndEmail: [string, string, string] };
}) {
  console.log({ tokenAndEmail });
  // return <div>Hello there activation</div>
  let data = false;
  try {
    data = await postData(`/api/user/activate`, tokenAndEmail);
    console.log({ data });
  } catch (error: any) {
    console.log({ msg: error.message });
  }
  Swal.fire("Check your email inbox for the activation link");
  // redirect("/");
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">
            Check inbox and try again
          </h2>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <Link href={"/auth/login"} className="text-2xl font-semibold mb-6">Successfully activated! Go to login</Link>
      </div>
    </div>
  );
}

export default UserActivationPage;
