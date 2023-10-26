import { postData } from "@/utils";


async function UserActivationPage({ params }: {params:{token:[string,string,string]}}) {
    const res =  await postData(`/user/activate`, {token:params.token} )
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      </div>
    </div>
  );
}

export default UserActivationPage;
