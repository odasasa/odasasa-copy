"use client"
// MyTable.tsx
import React, { useState } from "react";

import { strCapitalize } from "@/utils";
import TableRow from "./TableRow";

interface MyTableProps {
  data: Array<{ [key: string]: any }>;
  setSelectedItem: any;
  excludeFields?: string[]; // Fields to be excluded from display
  includeFields?: string[]; // Fields to be included in display
  hiddenFields?: string[]; // Fields to be hidden
}

const MyTable: React.FC<MyTableProps> = ({
  data,
  setSelectedItem,
  excludeFields = [],
  includeFields = [],
  hiddenFields = [],
}) => {
  let defaultExcludedFields = Object.keys(
      Array.isArray(data) && data.length > 0 ? data[0] : []
    ).filter((key) => key.includes("_")),
    allHidenFields = Array.from(new Set(defaultExcludedFields.concat()));

  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  const initialSortConfig = {
    key: "", // Initial sorting key
    direction: "asc", // Initial sorting direction
  };

  const [sortConfig, setSortConfig] = useState(initialSortConfig);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  let filteredKeys = Object.keys(sortedData[0]);

  // If includeFields is provided, filter keys based on it
  if (includeFields.length > 0) {
    filteredKeys = filteredKeys.filter((key) => includeFields.includes(key));
  }

  // Remove fields specified in excludeFields
  filteredKeys = filteredKeys.filter((key) => !excludeFields.includes(key));

  // Remove fields specified in hiddenFields
  filteredKeys = filteredKeys.filter((key) => !allHidenFields.includes(key));

  return (
    <table className="w-full overflow-x-hidden border-b-2 border-solid border-gray-200">
      <thead>
        <tr>
          {filteredKeys.map((key) => (
            <th
            className="truncate"
              key={key}
              onClick={() =>
                setSortConfig({
                  key,
                  direction: sortConfig.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              {strCapitalize(key)}
            </th>
          ))}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, indx) => (
          <TableRow
            key={`${item._id || indx}-${indx}`}
            rowCount={1 + indx}
            item={item}
            setSelectedItem={setSelectedItem}
            excludeFields={excludeFields}
            includeFields={includeFields}
            hiddenFields={hiddenFields}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;
