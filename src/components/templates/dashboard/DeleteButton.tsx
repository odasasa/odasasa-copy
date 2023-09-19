"use client"
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps{
    className?:string;
   id:string | number;
   iconClasses?:string
   
}

const DeleteButton = ({className ="", id}:DeleteButtonProps) => {
  const handleDelete = ()=>{

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.  with id  '+id,
          'success'
        )
      }
    })

  }
  return (
    <button 
    onClick={()=>handleDelete}
    className={twMerge("bg-transparent hover:bg-dashboard-red rounded-md outline outline-dashboard-red", className)}>
        <FaTrash />
    
    </button>
  )
}

export default DeleteButton