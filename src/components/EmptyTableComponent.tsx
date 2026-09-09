import React from "react";
import Image from "next/image";
import emptyState from "../assets/image/empty.png";

const EmptyTableComponent = (props: any) => {
  return (
    <div className="flex flex-col items-center justify-start mx-auto h-full w-full min-h-[600px]">
      <table className="w-full">
        <thead className="p-[20px] bg-white border-b border-[#122644]">
          <tr className="bg-white ">
            {props.columns?.map((headd: any, index: any) => (
              <th
                className="font-600 text-[15px] text-center text-[#122644] p-[16px] "
                key={index}
              >
                {headd.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="flex flex-col items-center mt-[100px]">
        <Image src={emptyState} alt="" />
        <div className="text-[#8487A3] text-xs -mt-2">
          Nothing to show here{" "}
        </div>
      </div>
    </div>
  );
};

export default EmptyTableComponent;
