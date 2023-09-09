
import { Typography } from "@/components";
import { Product } from "@/types";
import { fetchData } from "@/utils";
import { FaEdit, FaTrashAlt } from "react-icons/fa";


export default async function Page(props: any) {

    const data = await fetchData('/api/dummy/product', { revalidate: 3 });
    // console.log({ data })
    if (!data) return <div>No data</div>
    return <div className=" w-full px-8 py-5 flex flex-col gap-3">
        <div className="text-left">Add prod</div>

        <div className="w-full my-2">
            {/* Headers */}
            <div
                className="grid grid-cols-10 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 ">
                <span className="overflow-hidden">#</span>
                <span className="overflow-hidden">Image</span>
                <span className="overflow-hidden">Name</span>
                <span className="overflow-hidden ">Category</span>
                <span className="overflow-hidden col-span-2">Description</span>
                <span className="overflow-hidden">Unit</span>
                <span className="overflow-hidden">Price</span>
                <span className="overflow-hidden">Status</span>
                <span className="overflow-hidden">Edit</span>
            </div>

            {
                data.map((p: Product, indx: number) => <div key={p.id}
                    className="grid grid-cols-10 border-b-2 border-solid hover:bg-[#f9f9ff] py-3">
                    <span className="overflow-hidden">{indx + 1}</span>
                    <span className="overflow-hidden">Image Here</span>
                    <span className="overflow-hidden">{p.title}</span>
                    <span className="overflow-hidden">{p.category}</span>
                    <span className="overflow-hidden col-span-2 text-clip ">{p.description}</span>
                    <span className="overflow-hidden">{p.unit}</span>
                    <span className="overflow-hidden">{p.price}</span>
                    <span className="overflow-hidden">{p.status}</span>
                    <div className="flex justify-between items-center ">
                        <button className="border-2 border-solid border-orange-400 px-4 py-2 rounded-md"> <FaEdit className="text-orange-400" size  ={20} /></button>
                        <button className="border-2 border-solid border-red-400 px-4 py-3 rounded-md"> <FaTrashAlt className="text-red-400" size={15} /></button>
                    </div>
                </div>)
            }
        </div>


    </div>


}

