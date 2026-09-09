import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyUserValue } from "../../../src/utils/boxValues";
import { useCallback, useEffect, useState, memo } from "react";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import { useDispatch, useSelector } from "react-redux";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import JobsDisplay from "../../../src/components/tables/JobsDisplay";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { jobApi, orderApi, transactionApi, userApi } from "src/components/api";
import { GetStaticProps } from "next/types";
import { useAppSelector } from "src/Hooks/use-redux";
import { uiActions } from "src/redux/store/ui-slice";
import { clearError, clearMessage } from "src/redux/store/features/user-slice";
import { Avatar } from "@mui/material";

const OneUser = (props: any) => {
  const request = useHTTPGet();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>();
  const [orders, setOrders] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [job, setJob] = useState<any>();
  const [selected, setSelected] = useState<any>(1);
  const [value, setValue] = useState(0);
  const { users, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  console.log(props);
  const fetchAUser = useCallback(
    (id: any) => {
      const url = `${userApi}/single-user/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        setUser(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const fetchAllJobs = useCallback(
    (id: any) => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${jobApi}/jobs-by-user/${id}`;
      const dataFunction = (res: any) => {
        setJob(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const fetchOrdersByAUser = useCallback(
    (id: any) => {
      const accessToken = sessionStorage.getItem("accessToken");
      const url = `${orderApi}/orders-by-user/${id}`;
      const dataFunction = (res: any) => {
        setOrders(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const fetchAllTransactions = useCallback(
    (id: string) => {
      const url = `${transactionApi}/transactions-by-user/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        setTransactions(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAUser(props.userId);
    fetchAllJobs(props.userId);
    fetchOrdersByAUser(props.userId);
    fetchAllTransactions(props.userId);
  }, [props.userId]);

  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );
      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  return (
    <ParentContainer>
      {user && (
        <div className="">
          <ActionList user={user} />
          <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1 md:items-start items-center">
            <div className="flex gap-[30px] items-start text-white md:w-[300px] w-full">
              {user?.image && (
                <div>
                  {" "}
                  <Avatar src={user?.image} alt={user?.fullName} />
                </div>
              )}
              <div className="flex flex-col gap-[14px]">
                <h2 className="text-[16px] text-text">
                  {user?.fullName}
                  <span className="">
                    {" "}
                    {user?.emailVerifiedStatus === "verified" && (
                      <Image src={verify} alt={""} />
                    )}
                  </span>
                </h2>
                <div className="flex justify-between gap-[9px] items-center">
                  <h4 className="text-[10px]">{user?.role}</h4>
                  <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                  <div className="text-[10px]">{user?.email}</div>
                </div>
                <div className="flex justify-between gap-[9px] items-center">
                  {user.gender && (
                    <h4 className="text-[10px]">
                      {" "}
                      <span>
                        {" "}
                        <Image src={gender} alt={""} />
                      </span>
                      {user?.gender}
                    </h4>
                  )}
                  {user?.phone && user?.gender && (
                    <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                  )}

                  {user?.phone && (
                    <div className="text-[10px]">
                      {" "}
                      <span>
                        {" "}
                        <Image src={birth} alt={""} />
                      </span>
                      {user?.phone}
                    </div>
                  )}
                </div>

                <div className="md:w-[193px] w-full bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px] gap-3">
                  <div className="flex flex-col justify-between">
                    <div className="text-[8px]">Escrow Balance</div>
                    <div className="text-xs font-[500]">
                      ₦ {user?.wallet?.escrowBalance}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-[8px] ">Withdrawable Balance</div>
                    <div className="text-xs font-[500]">
                      {" "}
                      ₦ {user?.wallet?.withdrawableBalance}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {user?.role === "driver" ? (
              <div className="flex md:flex-col  my-3 items-center justify-around text-white w-full ">
                <div className="flex flex-row gap-3 text-white">
                  {user?.profile?.driversLicenceFront ? (
                    <div className="text-white flex flex-col">
                      <h3 className="text-[13px] mt-[28px] text-text">
                        {" "}
                        Driver's Licence Front
                      </h3>
                      <p className="text-[10px]">
                        {user?.profile?.driversLicenceFront}
                      </p>
                    </div>
                  ) : null}
                  {user?.profile?.driversLicenceBack ? (
                    <div className="text-white flex flex-col">
                      <h3 className="text-[13px] mt-[28px] text-text">
                        Driver's Licence Back
                      </h3>
                      <p className="text-[10px]">
                        {user?.profile?.driversLicenceBack}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-row gap-3 text-white">
                  <div className="text-white flex flex-col">
                    <h3 className="text-[13px] mt-[28px] text-text">
                      {" "}
                      Completed Rides
                    </h3>
                    <p className="text-[10px]">
                      {user?.profile?.numOfCompletedRides}
                    </p>
                  </div>
                  {user?.profile?.vehicle?.length === 0 ? (
                    <div className="text-white flex flex-col">
                      <h3 className="text-[13px] mt-[28px] text-text ">
                        Vehicle Details
                      </h3>
                      <p className="text-[10px]"></p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
            {user?.role === "rider" ? (
              <div className="flex md:flex-col  my-3 items-center justify-around text-white w-full">
                <div className="flex flex-row gap-3 text-white">
                  <div className="text-white flex flex-col">
                    <h3 className="text-[13px] mt-[28px] text-text">
                      {" "}
                      House Address
                    </h3>
                    <p className="text-[10px]">{user?.profile?.homeLocation}</p>
                  </div>
                  {user?.profile?.workLocation ? (
                    <div className="text-white flex flex-col">
                      <h3 className="text-[13px] mt-[28px] text-text">
                        Work Location
                      </h3>
                      <p className="text-[10px]">
                        {user?.profile?.workLocation}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="text-white flex flex-col ">
                  <h3 className="text-[13px] mt-[28px] text-text">
                    Completed Rides
                  </h3>
                  <p className="text-[10px]">{user?.profile?.completedRides}</p>
                </div>
              </div>
            ) : null}
            {user?.role === "merchant" ? (
              <div className="flex flex-col items-center justify-around text-white w-full">
                <div className="flex md:flex-col gap-3 text-white">
                  <div className="text-white flex flex-col">
                    <h3 className="text-[13px] mt-[28px] text-text">
                      Merchant Type
                    </h3>
                    <p className="text-[10px]">{user?.profile?.merchantType}</p>
                  </div>
                  <div className="text-white flex flex-col">
                    <h3 className="text-[13px] mt-[28px] text-text">
                      Merchant Category
                    </h3>
                    <p className="text-[10px]">
                      {user?.profile?.merchantCategory.categoryName}
                    </p>
                  </div>
                </div>
                {user?.profile?.bio ? (
                  <div className="text-white flex flex-col max-w-[300px] text-center">
                    <h3 className="text-[13px] mt-[28px] text-text">About</h3>
                    <p className="text-[10px]">{user?.profile?.bio}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-col justify-around text-white w-full md:w-[200px]">
              <div className="text-white text-[13px] my-2 md:text-center">
                Total Orders
              </div>
              <div className="flex md:flex-col flex-row w-full gap-3 items-center">
                <div className="bg-faintWhite p-[11px] w-[97px] rounded-md ">
                  <div className="text-[8px] ">Successful</div>
                  <div className="text-sm font-semibold">100</div>
                </div>
                <div className="bg-faintWhite p-[11px]  w-[97px] rounded-md ">
                  <div className="text-[8px] ">Cancelled</div>
                  <div className="text-sm font-semibold">100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[30px]">
            {" "}
            <Box
              sx={{ width: "100%" }}
              style={{
                background: "white",
                height: "100vh",
                fontFamily: "ClashDisplay",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{ background: "#edf2f7" }}
                  // classes={{ flexContainer: classes.flexContainer }}
                >
                  {MyUserValue.map(value => (
                    <Tab
                      label={value.label}
                      {...a11yProps(value.id)}
                      key={value.id}
                      style={{
                        backgroundColor:
                          selected === value.id ? "white" : "transparent",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "12px",
                        lineHeight: "136.52%",
                        textAlign: "center",
                        color: "rgba(132, 135, 163, 1)",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        setSelected(value.id);
                      }}
                    />
                  ))}
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <SupportingDocuments />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <BankDetails data={user?.bank} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <OrderHistory data={orders} />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <TransactionHistory
                  id={user.userID}
                  transactions={transactions}
                />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div></div>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <JobsDisplay jobs={job} type="profile" />
              </TabPanel>
            </Box>
          </div>
        </div>
      )}
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const userId = context.params.usersId;
  const param = context.resolvedUrl;
  console.log(context.params);
  return {
    props: {
      userId,
      param,
    },
  };
};
export default memo(OneUser);
