import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { Wrapper } from "@/components/templates/dashboard/main";
import { Product } from "@/types";
import { fetchData } from "@/utils";
import { strCapitalize } from "@/utils/str_functions";


export default async function ProductPage(props: any) {

    const data = await fetchData('/api/product', { revalidate: 3 });
    // console.log({ data })
    if (!data) return <div>No data</div>
    return(
        <Wrapper
        // handleAddBtn={() => console.log("Helo Mwero")}
        shouldAddBtn ={true}
    >
        {/* Headers */}
        
        <div
            className="w-full grid grid-cols-10 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 mx-1 text-sm">
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
            data.map((p: Product, indx: number) => <div key={`${p.id}-${indx}`}
                className="w-full overflow-x-hidden grid grid-cols-10 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm">
                <span className="overflow-hidden">{indx + 1}</span>
                <span className="overflow-hidden">Image Here</span>
                <span className="overflow-hidden">{p.title}</span>
                <span className="overflow-hidden">{p.category}</span>
                <span className="overflow-hidden col-span-2 text-clip ">{p.description}</span>
                <span className="overflow-hidden">{p.unit}</span>
                <span className="overflow-hidden">{p.price}</span>
                <span className={`overflow-hidden flex justify-center items-center`}>  <span className={`p-1 rounded-full mx-1 ${p.status.toLowerCase().includes('active')?'bg-green-300':'bg-red-400'}`}></span>
                   {" "+strCapitalize(p.status) }</span>
                <div className="flex justify-between items-center ">
                    <button className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md"> <FaEdit className="text-lg text-orange-400"  /></button>
                    <button className="border-2 border-solid border-red-400 px-2 py-2 rounded-md"> <FaTrashAlt className="text-lg text-red-400"  /></button>
                </div>
            </div>)
        }
          
    </Wrapper>
  
    )

}

