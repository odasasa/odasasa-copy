"use client";
// import { use } from "react";
import { fetchData } from "@/utils";
import { Wrapper } from "@/components/templates/dashboard/main";
import { Category } from "@/types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { strCapitalize } from "@/utils/str_functions";
import { DeleteButton, Typography } from "@/components";
import { categories } from "@/dummy_data/categories";
import { useGlobalContext } from "@/context/GlobalContext";
import Modal from "@/components/molecules/Modal";
import AddButton from "@/components/templates/dashboard/AddButton";
// import { useModal } from "@/hooks";

export default function CategoriesPage() {
  // let data = use(fetchData("/api/dummy/category"));
  // let { myModal } = useModal();
  //   console.log(data);
  const { data: globalData, setData } = useGlobalContext(),
    { isModalOpen } = globalData;

  let data = categories;

  if (!data) return <div>No data</div>;
  return (
    <Wrapper
      handleAddBtn={() => setData({ ...globalData, isModalOpen: !isModalOpen })}
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
            <DeleteButton id={"1"} />
          </div>
        </div>
      ))}
      {/* {myModal} */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setData({ ...globalData, isModalOpen: !isModalOpen })}
      >
        <div className=" flex flex-col w-[500px] ">
          <input
            type="text"
            name="category"
            placeholder="Max 20 Characters"
            maxLength={20}
            className="px-6 py-3 outline block my-2"
          />
          <div className="flex flex-row">
            <div className="w-1/2 ">
              <label>CATEGORIES UNIT </label>
              <select
                name="units"
                placeholder="select units"
                className=" outline block"
              >
                {["kilograms ", "Gram", "Per pcs"].map((op) => (
                  <option value={op}>{op}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2  flex flex-col">
              <label>CATEGORIES STATUS </label>
              <div className="w-full flex space-x-2 outline px-6">
                <label className="text-green-600">
                  <input type="radio" name="status" value={"active"} /> Active
                </label>
                <label className="text-red-600">
                  <input type="radio" name="status" value={"pause"} /> Pause
                </label>
              </div>
            </div>
          </div>
          <button className="px-8 py-4 rounded-3xl bg-product-blue text-white my-4">
            + Add Category
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
}
