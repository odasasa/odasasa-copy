// TableRow.tsx
import React from "react";
import { FaEdit } from "react-icons/fa";
import { DeleteButton } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";
import { twMerge } from "tailwind-merge";

interface TableRowProps {
  item: { [key: string]: any };
  setSelectedItem: any;
  excludeFields?: string[]; // Fields to be excluded from display
  includeFields?: string[]; // Fields to be included in display
  hiddenFields?: string[]; // Fields to be hidden
  rowCount?: number; // Number of rows in table
}

const TableRow: React.FC<TableRowProps> = ({
  rowCount = 0,
  item,
  setSelectedItem,
  excludeFields = [],
  includeFields = [],
  hiddenFields = [],
}) => {
  const { data: globalData, setData } = useGlobalContext();
  let keys = Object.keys(item);

  // If includeFields is provided, filter keys based on it
  if (includeFields.length > 0) {
    keys = keys.filter((key) => includeFields.includes(key));
  }

  // Remove fields specified in excludeFields
  keys = keys.filter((key) => !excludeFields.includes(key));

  // Remove fields specified in hiddenFields
  keys = keys.filter((key) => !hiddenFields.includes(key));

  return (
    <tr
      className={twMerge(
        "hover:bg-gray-100 px-12",
        rowCount % 2 !== 0 ? "bg-gray-50" : ""
      )}
    >
      {keys.map((key) => (
        <td key={key} className="truncate">{!['string', 'number', 'boolean'].includes(item[key])? (item[key] || "").toString():item[key]}</td>
      ))}

      <td>
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setSelectedItem(item);
              setData({
                ...globalData,
                isModalOpen: !globalData.isModalOpen,
              });
            }}
            className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md"
          >
            <FaEdit className="text-lg text-orange-400" />
          </button>

          <DeleteButton id={item._id} table="town" />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
