import React, { useState, Fragment } from "react";
import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import emptyState from "../assets/image/illustrations.svg";
import SortIcon from "@mui/icons-material/ArrowDownward";
import EmptyTableComponent from "./EmptyTableComponent";

createTheme("solarized", {
  striped: {
    default: "#4356e31a",
  },
});
const customStyles = {
  rows: {
    style: {
      padding: "0px",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 17,
      letterSpacing: 0.4,
      color: "rgba(118, 118, 118, 1)",
      border: "none",
    },
  },
  head: {
    style: {
      backgroundColor: "red",
    },
  },
  headCells: {
    style: {
      fontWeight: 600,
      fontSize: 15,
      color: "rgba(18, 38, 68, 1)",

      borderBottom: "1px solid rgba(18, 38, 68, 1)",
      textAlign: "center",
    },
  },

  pagination: {
    style: {
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

const paginationComponentOptions = {
  noRowsPerPage: false,
  rowsPerPageText: "",
};

export const DataFilterTable = (props: any) => {
  const [filterText, setFilterText] = useState("");
  const customFilter = (rows: any[], text: string) => {
    return rows?.filter(row =>
      Object.keys(row).some(key =>
        row[key]?.toString().toLowerCase().includes(text.toLowerCase())
      )
    );
  };
  return (
    <div className="min-h-[600px] flex flex-col space-y-2 bg-white relative">
      {props?.data?.length > 0 && (
        <input
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          placeholder="Search here"
          className="absolute right-1 -top-12 bg-lightGray rounded-md border border-lightPurple w-[200px] self-end mb-2 p-2 mr-1 outline-none placeholder:text-sm placeholder:text-text text-text text-sm"
        />
      )}
      <DataTable
        columns={props?.columns}
        data={customFilter(props?.data, filterText)}
        sortIcon={<SortIcon />}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        striped
        responsive
        noDataComponent={<EmptyTableComponent columns={props?.columns} />}
        theme="solarized"
        customStyles={customStyles}
      />
    </div>
  );
};
export default DataFilterTable;
