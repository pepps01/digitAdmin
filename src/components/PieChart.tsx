import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Months } from "src/utils/months";

const COLORS = [
  "rgba(18, 38, 68, 1) ",
  "#00C49F",
  "#FFBB28",
  "rgba(24, 160, 251, 1)",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartDashboard = ({ orders }: any) => {
  const [month, setMonth] = useState<any>("");
  let pending = 0;
  let rejected = 0;
  let accepted = 0;
  let completed = 0;
  const [statusGroup, setStatusGroup] = useState<any>([
    {
      name: "Pending",
      value: 0,
    },
    {
      name: "Rejected",
      value: 0,
    },
    {
      name: "Accepted",
      value: 0,
    },
    {
      name: "Completed",
      value: 0,
    },
  ]);

  useEffect(() => {
    const filterOrders = orders?.filter((tr: any) => {
      const formDate = moment(tr?.orderDate).format("MMM");
      return formDate === month;
    });

    filterOrders.forEach((order: any) => {
      if (order.status === "Pending") return pending++;
      if (order.status === "Rejected") return rejected++;
      if (order.status === "Accepted") return accepted++;
      if (order.status === "Completed") return completed++;
    });
    setStatusGroup([
      {
        name: "Pending",
        value: pending || 10,
      },
      {
        name: "Rejected",
        value: rejected || 10,
      },
      {
        name: "Accepted",
        value: accepted || 10,
      },
      {
        name: "Completed",
        value: completed || 10,
      },
    ]);
  }, [orders, pending, accepted, completed, rejected, month]);
  useEffect(() => {
    setMonth(moment().format("MMM"));
  }, []);
  return (
    <div className="bg-white w-full md:w-[35%] h-[auto]  rounded-md p-7">
      <div className=" flex justify-between items-center mb-5 p-5">
        <div className="text-gray-800 text-2xl">Order Status</div>
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
              color: "#212B4C",
              height: "30px",
            }}
          >
            {Months?.map((month: any) => (
              <option
                value={month}
                style={{
                  fontSize: "13px",
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
      <div className=" w-full h-[60%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={statusGroup}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusGroup.map((_entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex w-full items-center justify-around">
          {COLORS.map((color, i) => (
            <div key={color} className="flex flex-col items-center">
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: color,
                  borderRadius: "50%",
                }}
              />
              <div>{statusGroup[i]?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PieChartDashboard;
