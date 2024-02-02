"use client";
// DynamicTable.tsx
import React, { useState } from "react";
import { DeleteButton } from "..";
import { FaEdit } from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalContext";

export interface Column {
  label: string;
  field: string;
  type?: "text" | "number" | "money" | "date";
}

interface Data {
  [index: string]: any;
}

interface DynamicTableProps {
  columns: Column[];
  data: Data[];
  table: string;
  setSelectedItem?: any;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  table,
  setSelectedItem = null,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const { data: globalData, setData } = useGlobalContext();

  const handleSort = (column: Column) => {
    if (sortColumn === column.field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column.field);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (column: Column, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column.field]: value,
    }));
  };

  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, value]) =>
      String(row[key]).toLowerCase().includes(value.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.field}
              className="py-2 px-4 border-b border-gray-300 cursor-pointer text-left"
              onClick={() => handleSort(column)}
            >
              {column.label}
              {sortColumn === column.field && (
                <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
              )}
            </th>
          ))}
          {setSelectedItem && <th colSpan={2}>Operations</th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
          >
            {columns.map((column) => (
              <td
                key={column.field}
                className="py-2 px-4 border-b border-gray-300"
              >
                {Object.keys(row).includes(column.field)
                  ? ["date"].includes(column?.type ?? "")
                    ? new Date(row[column.field]).toLocaleString()
                    : row[column.field].includes(',')? row[column.field].split(',').map((i:string)=><>{i}<br/></>) : row[column.field]
                  : ""}
              </td>
            ))}
            {setSelectedItem && (
              <>
                <td>
                  <button
                    onClick={() => {
                      setSelectedItem(row);
                      console.log({ row });
                      setData({
                        ...globalData,
                        isModalOpen: !globalData.isModalOpen,
                      });
                    }}
                    className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md"
                  >
                    <FaEdit className="text-lg text-orange-400" />
                  </button>
                </td>
                <td>
                  <DeleteButton id={row._id} table={table} />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
