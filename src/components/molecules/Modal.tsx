"use client"
import React, { ReactNode } from 'react';
// import { XCircleIcon } from 'react-icons/fa'; // Import an icon of your choice
import { GrFormClose } from 'react-icons/gr'
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?:string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,className }) => {

  if (isOpen) return null;

  return (
    <div className={twMerge("fixed inset-0 flex items-center justify-center z-50", className)}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="w-96 p-4 bg-white rounded-lg shadow-lg z-10">
        <div className="flex justify-end">
          <button
            onClick={()=>onClose}
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            {/* <XCircleIcon size={24} /> */}
            <GrFormClose size={24} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
