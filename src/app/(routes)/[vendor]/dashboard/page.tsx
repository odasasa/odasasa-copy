
import { Typography } from "@/components";
import { Product } from "@/types";


const getProducts = async () => await (await fetch("http://localhost:3000/api/dummy/product", {
    next: { revalidate: 3 }
})).json()

export default async function Page() {

    const data = await getProducts();
    console.log({ data })
    if (!data) return <div>No data</div>
    return <div className=" w-full px-8 py-5 flex flex-col gap-3">
        <div className="text-left">Add prod</div>

        <div className="w-full my-2">
            {/* Headers */}
            <div
                className="grid grid-cols-9 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 ">
                <span className="overflow-hidden">#</span>
                <span className="overflow-hidden">Image</span>
                <span className="overflow-hidden">Name</span>
                <span className="overflow-hidden">Category</span>
                <span className="overflow-hidden">Description</span>
                <span className="overflow-hidden">Unit</span>
                <span className="overflow-hidden">Price</span>
                <span className="overflow-hidden">Status</span>
                <span className="overflow-hidden">Edit</span>
            </div>

            { 
                data.map((p: Product, indx: number) => <div key={p.id}
                    className="grid grid-cols-9 border-b-2 border-solid hover:bg-[#f9f9ff] ">
                    <span className="overflow-hidden">{indx + 1}</span>
                    <span className="overflow-hidden">Image Here</span>
                    <span className="overflow-hidden">{p.title}</span>
                    <span className="overflow-hidden">{p.category}</span>
                    <span className="overflow-hidden">{p.description}</span>
                    <span className="overflow-hidden">{p.unit}</span>
                    <span className="overflow-hidden">{p.price}</span>
                    <span className="overflow-hidden">{p.status}</span>
                    <div className="flex gap1">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>)
            }
        </div>


    </div>


}

