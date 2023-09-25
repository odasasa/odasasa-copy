"use client";
import { deleteById } from "@/utils";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps {
  className?: string;
  id: string | number;
  iconClasses?: string;
  title?: string;
}

const DeleteButton = ({
  className = "",
  id,
  title = "",
}: DeleteButtonProps) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let res = await deleteById("/api/category/" + id);
          if (res.success)
            return Swal.fire("Deleted!", `${title} Successfully deleted.`, "success");
          throw new Error(`Delete operation failed. Try gain`);
        } catch (error: any) {         
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };
  return (
    <button
      onClick={() => handleDelete()}
      className={twMerge("bg-transparent  rounded-md", className)}
    >
      <FaTrash className="text-red-600" />
    </button>
  );
};

export default DeleteButton;
