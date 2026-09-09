import profilePic from "../../../src/assets/image/profilePic.svg";
import verify from "../../../src/assets/image/verify.svg";
import gender from "../../../src/assets/image/gender.svg";
import birth from "../../../src/assets/image/birth.svg";
import rating from "../../../src/assets/image/rating.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { MyMerchantValue, MyUserValue } from "../../../src/utils/boxValues";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import SupportingDocuments from "../../../src/components/BoxComponents/SupportingDocuments";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import OrderHistory from "../../../src/components/BoxComponents/OrderHistory";
import TransactionHistory from "../../../src/components/BoxComponents/TransactionHistory";
import ActionList from "../../../src/components/ActionList";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import JobsDisplay from "../../../src/components/tables/JobsDisplay";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import {
  baseUrl,
  jobApi,
  orderApi,
  productApi,
  serviceApi,
  userApi,
} from "src/components/api";
import { GetStaticProps } from "next/types";
import { uiActions } from "src/redux/store/ui-slice";
import { clearError, clearMessage } from "src/redux/store/features/user-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { merchantType } from "src/@types/data";
import { Avatar } from "@mui/material";
import ProductTable from "src/components/tables/ProductTable";
import ServiceTable from "src/components/tables/ServiceTable";

const OneMerchant = (props: any) => {
  const request = useHTTPGet();
  const dispatch = useAppDispatch();
  const { users, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  const [user, setUser] = useState<merchantType>();
  const [orders, setOrders] = useState<any>([]);
  const [job, setJob] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);

  const fetchAMerchant = useCallback(
    async (id: any) => {
      const url = `${userApi}/single-user/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        console.log(res);
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
        console.log(res.data);
        setJob(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );
  const fetchProducts = useCallback(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${productApi}/products-by-merchant/${user?.profile.merchantID}`;
    const dataFunction = (res: any) => {
      console.log(res.data);
      setProducts(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);
  const fetchServices = useCallback(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${serviceApi}/services-by-merchant/${user?.profile.merchantID}`;
    const dataFunction = (res: any) => {
      console.log(res.data);
      setServices(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);
  const fetchOrdersByAMerchant = useCallback(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${orderApi}/orders-for-merchant/${user?.profile.merchantID}`;
    const dataFunction = (res: any) => {
      setOrders(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAMerchant(props.merchantId);
    fetchAllJobs(props.merchantId);
    fetchProducts();
    fetchServices();
  }, [props.merchantId]);

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
      fetchAMerchant(props.merchantId);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [
    loading,
    error,
    message,
    success,
    dispatch,
    fetchAMerchant,
    props.merchantId,
  ]);
  return (
    <ParentContainer>
      <div>
        <ActionList user={user} />
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1 md:items-start items-center">
          <div className="flex gap-[30px] items-start text-white md:w-[300px] w-full">
            {user?.image && (
              <div>
                <Avatar src={user?.image} alt={user?.fullName} />
              </div>
            )}
            <div className="flex flex-col gap-[14px]">
              <h2 className="text-[16px]">
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
                {user?.gender && (
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

          <div className="flex flex-col items-center justify-around text-white w-full">
            <div className="flex md:flex-col gap-3 text-white">
              <div className="text-white flex flex-col">
                <h3 className="text-[13px] mt-[28px]">Merchant Type</h3>
                <p className="text-[10px]">{user?.profile?.merchantType}</p>
              </div>
              <div className="text-white flex flex-col">
                <h3 className="text-[13px] mt-[28px]">Merchant Category</h3>
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

          <div className="flex flex-col justify-around text-white w-full md:w-[200px]">
            <div className="text-white text-[13px] my-2 md:text-center">
              Total Orders
            </div>
            <div className="flex md:flex-col flex-row w-full gap-3 items-center">
              <div className="bg-faintWhite p-[11px] w-[97px] rounded-md ">
                <div className="text-[8px] ">Successful</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    orders?.filter((item: any) => item.status === "Completed")
                      .length
                  }
                </div>
              </div>
              <div className="bg-faintWhite p-[11px]  w-[97px] rounded-md ">
                <div className="text-[8px] ">Cancelled</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    orders?.filter((item: any) => item.status === "Rejected")
                      .length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] w-full max-w-full overflow-x-auto">
          {" "}
          <Box
            sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}
            style={{ background: "white", height: "100vh" }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ background: "#edf2f7" }}
                // classes={{ flexContainer: classes.flexContainer }}
              >
                {MyMerchantValue.map((value: any) => (
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
              <SupportingDocuments data={user?.profile?.merchantInfo} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BankDetails data={user?.bank} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OrderHistory
                data={orders}
                id={user?.profile?.merchantID}
                role={user?.role}
              />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <TransactionHistory id={user?.userID} />
            </TabPanel>

            <TabPanel value={value} index={4}>
              <JobsDisplay jobs={job} type="profile" />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <ProductTable data={products} />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <ServiceTable data={services} />
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const merchantId = context.params.merchantId;
  return {
    props: {
      merchantId,
    },
  };
};
export default OneMerchant;
