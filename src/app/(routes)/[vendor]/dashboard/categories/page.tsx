"use client";
// import { use } from "react";
import { fetchData } from "@/utils";
import { Wrapper } from "@/components/templates/dashboard/main";
import { Category } from "@/types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { strCapitalize } from "@/utils/str_functions";
import { DeleteButton } from "@/components";
import { categories } from "@/dummy_data/categories";
// import { useModal } from "@/hooks";

export default function CategoriesPage() {
  // let data = use(fetchData("/api/dummy/category"));
  // let { myModal } = useModal();
//   console.log(data);
let  data=categories

  if (!data) return <div>No data</div>;
  return (
    <Wrapper
      handleAddBtn={() => console.log("Helo Mwero")}
      shouldAddBtn={true}
      addBtnLabel="Add Category"
    >
      {/* Headers */}

      <div className="w-full grid grid-cols-8 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 mx-1 text-sm">
        <span className="overflow-hidden">#</span>
        <span className="overflow-hidden">Image</span>
        <span className="overflow-hidden">Name</span>

        <span className="overflow-hidden col-span-2">Description</span>
        <span className="overflow-hidden">Unit</span>

        <span className={`overflow-hidden `}>Status</span>
        <span className="overflow-hidden">Edit</span>
      </div>

      {data.map((p: Category, indx: number) => (
        <div
          key={`${p.id}-${indx}`}
          className="w-full overflow-x-hidden grid grid-cols-8 border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm"
        >
          <span className="overflow-hidden">{indx + 1}</span>
          <span className="overflow-hidden">Image Here</span>
          <span className="overflow-hidden">{p.name}</span>

          <span className="overflow-hidden col-span-2 text-clip ">
            {p.description}
          </span>
          <span className="overflow-hidden">{p.unit}</span>

          <span className={`overflow-hidden flex justify-center items-center`}>
            {" "}
            <span
              className={`p-1 rounded-full mx-1 ${
                p.status.toLowerCase().includes("active")
                  ? "bg-green-300"
                  : "bg-red-400"
              }`}
            ></span>
            {" " + strCapitalize(p.status)}
          </span>
          <div className="flex justify-between items-center ">
            <button className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md">
              {" "}
              <FaEdit className="text-lg text-orange-400" />
            </button>
            {/* <button className="border-2 border-solid border-red-400 px-2 py-2 rounded-md">
              {" "}
              <FaTrashAlt className="text-lg text-red-400" />
            </button> */}
            <DeleteButton id={'1'}/>
          </div>
        </div>
      ))}
      {/* {myModal} */}
    </Wrapper>
  );
}
