import moment from "moment"
import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { numberWithCommas } from "src/utils/formatNumber"
import { Months } from "src/utils/months"

const DashboardChart = ({ transaction }: any) => {
  const [month, setMonth] = useState<any>("")
  useEffect(() => {
    setMonth(moment().format("MMM"))
  }, [])
  const formatter = (value: number) => {
    const formattedValue = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value)

    return formattedValue
  }

  const filterTransactions = transaction?.filter((tr: any) => {
    const formDate = moment(tr?.transDate).format("MMM")
    return formDate === month
  })
  const data = filterTransactions?.map((pc: any) => {
    const wallet = pc.paymentMethod === "wallet" ? Number(pc?.amount) : 0
    const paystack = pc.paymentMethod === "paystack" ? Number(pc?.amount) : 0
    return {
      date: moment(pc?.transDate).format("dddd, h:mm a"),
      wallet,
      paystack,
    }
  })
  const transactionFlow: number[] = data?.map((pc: any) => {
    return pc?.wallet || pc?.paystack
  })
  const mode = Math.max(...(transactionFlow || []))

  return (
    <div className="w-full">
      <div className="flex gap-4 md:gap-0 flex-col justify-between  md:items-center md:py-5 w-full md:flex-row ">
        <div className="text-gray-800 text-3xl text-center md:text-left">
          Transactions
        </div>
        <div className="flex justify-between mb-4 items-center  md:w-1/2">
          <div className="flex justify-between items-center md:w-[35%] gap-3">
            <div className="flex items-center">
              <div className="bg-lightPurple h-2 w-2 rounded-[100px] mr-2" />
              <div className="text-gray-800 text-1xl">Wallet</div>
            </div>
            <div className="flex items-center">
              <div className="bg-primary h-2 w-2 rounded-[100px] mr-2" />
              <div className="text-gray-800 text-1xl">Paystack</div>
            </div>
          </div>

          <div className="w-[50px]">
            <select
              id="demo-simple-select"
              value={month}
              name="month"
              onChange={(e: any) => setMonth(e.target.value)}
              style={{
                width: "100%",

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
      </div>
      <ResponsiveContainer height={300} width="100%" className="mx-auto">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            padding={{ left: 40, right: 30 }}
            tick={false}
            tickFormatter={(number) => `₦${numberWithCommas(number)}`}
            label={{ value: month.toUpperCase() }}
          />
          {filterTransactions?.length > 1 ? (
            <YAxis
              domain={[0, mode]}
              style={{
                fontSize: "8px",
                fontWeight: 800,
                fontFamily: "ClashDisplay",
              }}
              // label={<Label value="Amount" position="insideBottom" />}
              tickFormatter={formatter}
            />
          ) : (
            <YAxis domain={[0, 2000]} />
          )}
          <Legend />
          <Area
            type="monotone"
            dataKey="wallet"
            stroke="rgba(18, 38, 68, 1) "
            fill="rgba(18, 38, 68, 0.2) "
            activeDot={{ r: 8 }}
            strokeWidth={1.5}
            style={{ fontFamily: "ClashDisplay !important" }}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="paystack"
            stroke="rgba(255,187,40, 1)"
            fill="rgba(255,187,40, 0.2)"
            activeDot={{ r: 8 }}
            strokeWidth={1.5}
            style={{ fontFamily: "ClashDisplay !important" }}
            dot={false}
          />

          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>{" "}
    </div>
  )
}
export default DashboardChart
