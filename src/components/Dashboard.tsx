import CardContainer from "./CardContainer"
import DashboardChart from "./DashboardChart"

import ParentContainer from "./ParentContainer"
import PieChartDashboard from "./PieChart"

import UserTable from "./tables/UserTable"

const Dashboard = ({ recentUsers, transactions, orders, users }: any) => {
  return (
    <ParentContainer>
      <div className="w-full overflow-x-hidden  ">
        <CardContainer
          orders={orders}
          transaction={transactions}
          users={users}
        />
        {/* <div className="flex gap-5 flex-col lg:flex-row "> */}
        <div className="w-full flex flex-col md:flex-row gap-8  h-auto md:h-[500px] py-3">
          <div className="w-full md:w-[65%] overflow-x-auto bg-white p-4 rounded-sm ">
            {" "}
            <DashboardChart transaction={transactions} />
          </div>

          <PieChartDashboard orders={orders} />
        </div>
        {/* <div className="w-full flex flex-col md:flex-row gap-5 items-start p-[10px] md:p-[30px]"> */}
        <div className=" bg-white py-3 rounded-sm  w-full  max-h-[600px] overflow-hidden px-3 ">
          <div className="text-gray-800 text-3xl mb-16  text-center md:text-start">
            {" "}
            Recent Users
          </div>
          <div className=" ">
            <UserTable data={recentUsers} type="dashboard" action="none" />{" "}
          </div>
        </div>
      </div>
      {/* </div> */}
    </ParentContainer>
  )
}

export default Dashboard
