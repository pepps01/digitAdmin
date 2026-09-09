import moment from "moment";
import React, { useEffect, useState } from "react";
import { tableLoad } from "src/utils/analytics";
import { Months } from "src/utils/months";

const SmallTable = () => {
  const [month, setMonth] = useState<any>("");
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between w-full bg-white">
        <h3 className="text-gray-800 text-3xl">Tracking</h3>
        <div>
          <select
            id="demo-simple-select"
            value={month}
            name="month"
            onChange={(e: any) => setMonth(e.target.value)}
            style={{
              width: "100%",
              marginTop: "8px",
              background: "rgba(249, 250, 252)",
              border: "none",
              fontSize: "12px",
              fontFamily: "Steradian",
              color: "#212B4C",
              height: "30px",
            }}
          >
            {Months?.map((month: any) => (
              <option
                value={month}
                style={{
                  fontSize: "13px",
                  fontFamily: "Steradian",
                  color: "#212B4C",
                  height: "30px",
                }}
                key={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className=" overflow-auto max-h-[calc(400px-65px)]">
        <table className="w-full bg-white mt-6">
          <tr>
            <th className="border border-r-gray-400 text-xl text-gray-500">
              REGION
            </th>
            <th className="border border-l-gray-400 text-xl text-gray-500">
              AMOUNT
            </th>
          </tr>
          {tableLoad.map((val, key) => {
            return (
              <tr key={key}>
                <td className="border border-r-gray-400 text-sm text-gray-500 text-center p-4">
                  {val.region}
                </td>
                <td className="border border-l-gray-400 text-sm text-gray-500 text-center p-4">
                  {val.amount}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default SmallTable;
