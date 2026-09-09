import React, { useMemo, useEffect, useState } from "react";
import styles from "./Customers.module.scss";
import FundIcon from "../assets/image/funded.svg";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  Column,
  useRowSelect,
} from "react-table";

import * as RiIcons from "react-icons/ri";
import Image from "next/image";
import Add from "../assets/image/add.svg";
import Export from "../assets/image/export.svg";
import RightArrow from "../assets/image/right-direction.svg";
import LeftArrowFaded from "../assets/image/left-direction-faded.svg";
import EmptyTable from "../assets/image/empty.svg";
import { useDispatch, useSelector } from "react-redux";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItems from "./ActionMenu/ActionMenuItems";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import { useRouter } from "next/router";

type DataColumn = {
  data: any;
  columns: any;
  emptyPlaceHolder: string;
  loader: any;
  recent: any;
};

const MultipleSelectTable = ({
  data,
  columns,
  emptyPlaceHolder,
  recent,
  extraButton,
  rowClickable,
  list,
  onClickFunction,
}: Partial<any>) => {
  const router = useRouter();
  console.log(data, columns, recent);

  // const IndeterminateCheckbox = React.forwardRef(
  //   ({ indeterminate, ...rest }: any, ref: any) => {
  //     const defaultRef = React.useRef();
  //     const resolvedRef = ref || defaultRef;

  //     // React.useEffect(() => {
  //     //   resolvedRef.current.indeterminate = indeterminate;
  //     // }, [resolvedRef, indeterminate]);

  //     return (
  //       <>
  //         <input type="checkbox" ref={resolvedRef} {...rest} />
  //       </>
  //     );
  //   }
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    { columns, data },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
    // hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: "selection",
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  return (
    <>
      {
        <div className="h-full">
          {data?.length === 0 ? null : (
            <div className="w-full flex justify-between">
              <div className="flex gap-2 mb-6 items-center">
                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}
                  style={{
                    borderRadius: "5px",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    lineHeight: "21px",
                    display: "flex",
                    alignItems: "center",
                    color: "#37474f",
                  }}
                >
                  {[5, 10, 20, 30, 40, 50].reverse().map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-[#37474f]">entries</div>
              </div>
              <div className="flex items-center mb-6 gap-3 relative">
                <button className="text-sm text-lightPurple border border-lightPurple py-3 px-4 rounded-md flex items-center justify-center">
                  <span style={{ marginRight: "3px", translate: "0 3px" }}>
                    <Image src={Export} alt={""} />
                  </span>
                  {list ? (
                    <ActionMenuBase
                      style={{ backgroundColor: "red" }}
                      items={
                        <>
                          <ActionMenuItem name="Export All" />
                          <ActionMenuItem name="Export Selected" />
                        </>
                      }
                      text="Export List"
                      type="export"
                    />
                  ) : (
                    <div className="text-sm text-lightPurple ">Export</div>
                  )}
                </button>
                {/* {showList && (

                   )} */}
                {/* {extraButton?.text && (
                  <button
                    onClick={onClickFunction}
                    className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center"
                  >
                    <span style={{ marginRight: "3px", translate: "0 3px" }}>
                      <Image
                        src={extraButton.img ? extraButton.img : Add}
                        alt=""
                      />
                    </span>
                    {extraButton.text}
                  </button>
                )} */}
              </div>{" "}
            </div>
          )}
          <div className=" max-w-[100vw] overflow-x-auto relative z-2 h-full">
            <table
              {...getTableProps()}
              style={{ width: "100%" }}
              className="bg-white shadow-tableShadow rounded-md "
            >
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={column.id}
                        className="bg-white py-[13px] px-[20px] shadow-tableShadow text-sm text-darkPurple w-[300px]"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} style={{ width: "100%" }}>
                {page?.map((row: any) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      {...row.getRowProps()}
                      onClick={() => {
                        if (rowClickable === true) {
                          router.push(
                            `${location.pathname}/${row?.original.id}`
                          );
                        }
                      }}
                      className="px-[30px] py-[20px] border-b border-[#e5e5e5] h-[82px]  children-even:bg-[#cb91df]"
                    >
                      {row?.cells.map((cell: any) => {
                        return (
                          <td
                            key={cell.id}
                            {...cell.getCellProps()}
                            style={{
                              padding: "20px",
                              fontFamily: "Steradian",
                              fontStyle: "normal",
                              fontWeight: "normal",
                              fontSize: "12px",
                              lineHeight: "18px",
                              color: "#4C4E52",
                              textAlign: "center",
                            }}
                            className=""
                          >
                            {cell?.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {data?.length === 0 && (
              <div className="flex items-center justify-around flex-col h-full bg-[#f8f8f8] mt-8">
                <Image src={EmptyTable} alt="" />
                <div className="text-sm text-[#adafb0] mb-5">
                  {emptyPlaceHolder}
                </div>
                {/* <button
                  onClick={onClickFunction}
                  className="text-sm text-white bg-lightPurple py-3 px-9 rounded-md flex items-center justify-center"
                >
                  {" "}
                  {extraButton?.text}
                </button> */}
              </div>
            )}

            {/* Pagination */}

            {!recent ? (
              <>
                {" "}
                {/* Pagination */}
                {data?.length === 0 ? null : (
                  <div className="flex items-center justify-center gap-2 w-full mt-2">
                    <div
                      onClick={() => previousPage()}
                      style={{ paddingRight: "10px" }}
                    >
                      <div>
                        {pageIndex + 1 === 1 && (
                          <div className="text-xs text-softGray cursor-pointer">
                            Previous
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-base flex items-center text-[#37474f] border border-softGray px-2 py-1">
                      {pageIndex + 1}
                    </div>
                    <div onClick={() => nextPage()}>
                      <p className="text-xs text-softGray cursor-pointer">
                        Next
                      </p>
                    </div>
                  </div>
                )}
                {/* Pagination */}
                {/* Show items */}
                {/* Show items */}{" "}
              </>
            ) : null}
            {/* Pagination */}
          </div>{" "}
        </div>
      }
    </>
  );
};

export default MultipleSelectTable;
