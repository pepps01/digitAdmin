import React, {
  useMemo,
  useEffect,
  useState,
  ReactComponentElement,
} from "react";

// import FundIcon from "../../../assets/images/funded.svg";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  Column,
} from "react-table";

import * as RiIcons from "react-icons/ri";
import Image from "next/image";
import RightArrow from "../assets/image/right-direction.svg";
import LeftArrowFaded from "../assets/image/left-direction-faded.svg";
import EmptyTable from "../assets/image/empty-table.svg";
import { matchSorter } from "match-sorter";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined);
  // }, 200);

  return (
    <div
      style={{
        fontSize: "13px",
        fontFamily: "Steradian",
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
      }}
    >
      Search:{" "}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
        }}
        placeholder={`search...`}
        style={{
          borderRadius: "5px",
          border: "1px solid #e5e5e5",
          paddingTop: "5px ",
          paddingBottom: "5px",
          paddingLeft: "6px",
          marginLeft: "5px",
          width: "200px",
          color: "#e5e5e5",
        }}
      />
    </div>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: any) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      style={{
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #e5e5e5",
        paddingTop: "1px ",
        paddingBottom: "1px",
        paddingLeft: "3px",
        fontFamily: "Steradian",
        height: "18px",
        fontSize: "11px",
        marginTop: "5px",
      }}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options: any = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });

    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options?.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}: any) {
  const [min, max] = React.useMemo(() => {
    let min = new Date(preFilteredRows[0].values[id]);
    let max = new Date(preFilteredRows[0].values[id]);
    preFilteredRows.forEach((row: any) => {
      min = new Date(row.values[id]) <= min ? new Date(row.values[id]) : min;
      max = new Date(row.values[id]) >= max ? new Date(row.values[id]) : max;
    });
    return [min, max];
  }, [id, preFilteredRows]);
  console.log(min, max);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <input
        value={filterValue[0] || ""}
        type="date"
        onChange={e => {
          const val = e.target.value;
          console.log(e.target.value);
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        style={{
          width: "170px",
          marginRight: "0.5rem",
        }}
      />
      to
      <input
        value={filterValue[1] || ""}
        type="date"
        max={max.toISOString().slice(0, 10)}
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? val : undefined]);
        }}
        style={{
          width: "170px",
          marginLeft: "0.5rem",
        }}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

const FilterTable = ({
  data,
  columns,
  emptyPlaceHolder,
  recent,
  filter,
  onClick,
  clickAction,
  loader,
}: Partial<any>) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

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
    state: { pageIndex, pageSize },
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full">
      {loader ? null : (
        <div className="w-full">
          {data.length === 0 ? null : (
            <div className="flex gap-2 mb-6">
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
          )}
          {/* <div>
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          </div> */}
          <div>
            <table
              {...getTableProps()}
              style={{ width: "100%" }}
              className="bg-white shadow-tableShadow rounded-md"
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
                        className="bg-white py-[13px] px-[20px] shadow-tableShadow text-sm text-darkPurple"
                      >
                        {column.render("Header")}

                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                        {/* Render the columns filter UI */}
                        {filter && (
                          <div>
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} style={{ width: "100%" }}>
                {page?.map(row => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      className="px-[30px] py-[20px] border-b border-[#e5e5e5] h-[82px]"
                      onClick={() => {
                        clickAction && onClick(row.original);
                      }}
                      style={{ cursor: clickAction ? "pointer" : "default" }}
                    >
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={cell.value}
                            style={{
                              padding: "20px",
                              fontFamily: "Steradian",
                              fontStyle: "normal",
                              fontWeight: "normal",
                              fontSize: "14px",
                              lineHeight: "18px",
                              color: "#293333",
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {data.length === 0 && (
            <div className="flex items-start justify-center flex-col h-[250px] bg-[#f8f8f8]">
              <div className="text-sm text-[#adafb0] mb-5">
                {emptyPlaceHolder}
              </div>
              <Image src={EmptyTable} alt={""} />
            </div>
          )}

          {!recent ? (
            <>
              {" "}
              {/* Pagination */}
              {data.length === 0 ? null : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-base flex items-center text-[#37474f]">
                    {pageIndex + 1} of {pageCount}
                  </span>
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => previousPage()}
                        style={{ paddingRight: "10px" }}
                      >
                        <div>
                          {pageIndex + 1 === 1 ? (
                            <div>
                              <Image
                                src={LeftArrowFaded}
                                style={{ cursor: "pointer" }}
                                alt={""}
                              />
                            </div>
                          ) : (
                            <div>
                              <Image
                                src={RightArrow}
                                style={{
                                  transform: "rotate(180deg)",
                                  cursor: "pointer",
                                }}
                                alt={""}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div onClick={() => nextPage()}>
                        <div>
                          <Image
                            src={RightArrow}
                            style={{
                              cursor: "pointer",
                            }}
                            alt={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Pagination */}
              {/* Show items */}
              {/* Show items */}{" "}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FilterTable;
