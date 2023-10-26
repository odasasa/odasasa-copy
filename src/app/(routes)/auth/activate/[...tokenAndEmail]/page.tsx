import { postData } from "@/utils";


async function UserActivationPage({ params:{tokenAndEmail} }: {params:{tokenAndEmail:[string,string,string]}}) {
  console.log({tokenAndEmail})
  // return <div>Hello there activation</div>
  let data =[]
  try {
    data =  await postData(`/api/user/activate`, tokenAndEmail )
    console.log({data})
  } catch (error:any) {
    console.log({msg:error.message})
  }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
      </div>
    </div>
  );
}

export default UserActivationPage;
