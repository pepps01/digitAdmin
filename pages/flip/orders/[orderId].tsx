import location from "../../../src/assets/image/location.svg";
import quantity from "../../../src/assets/image/quantity.svg";
import cost from "../../../src/assets/image/cost.svg";
import date from "../../../src/assets/image/date.svg";
import Image from "next/image";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { MyOrderValue } from "src/utils/boxValues";
import { useEffect, useState, useCallback } from "react";
import { orderApi } from "src/components/api";
import useHTTPGet from "src/Hooks/use-httpget";
import BuyerDetails from "src/components/BuyerDetails";
import ProductOrderDetails from "src/components/ProductOrderDetails";
import OrderList from "src/components/OrderList";
import { uiActions } from "src/redux/store/ui-slice";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { GetStaticProps } from "next/types";
import { clearError, clearMessage } from "src/redux/store/features/order-slice";
import ParentContainer from "src/components/ParentContainer";

const OneOrder = (props: any) => {
  const { loading, error, message, success } = useAppSelector(
    (state: any) => state.order
  );
  const request = useHTTPGet();
  const [order, setOrder] = useState<any>({});
  const dispatch = useAppDispatch();

  const fetchAnOrder = useCallback(
    (id: any) => {
      const url = `${orderApi}/single-order/${id}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const dataFunction = (res: any) => {
        console.log(res);
        setOrder(res.data.data);
      };
      request({ url, accessToken }, dataFunction);
    },
    [request]
  );

  const [selected, setSelected] = useState(1);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchAnOrder(props.orderId);
  }, [props.orderId]);

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
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      fetchAnOrder(props.orderId);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, fetchAnOrder, props.orderId]);
  return (
    <ParentContainer>
      <div>
        <OrderList order={order} />
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[23px] md:px-[38px] flex gap-5">
          {" "}
          <div className="text-offWhite md:text-left md:text-lg text-center text-2xl">
            Overview
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-1 md:gap-0">
            <div className="flex md:flex-col gap-[14px] w-full md:w-auto items-center justify-center md:items-start md:justify-start">
              <div className="md:text-lg text-white font-semibold">
                OrderId:
                <span className="text-offWhite text-sm ml-2">
                  {" "}
                  {order?.orderID}
                </span>
              </div>
              <div className="flex">
                <div className="text-offWhite text-sm ">
                  <Image src={location} alt={""} />
                </div>
                <div className="text-offWhite md:text-sm text-xs">
                  {order?.deliveryAddress}
                </div>
              </div>
            </div>
            <div className="flex md:gap-6  w-[280px]  md:justify-start ">
              <div className="w-[100px] md:w-auto ">
                <div>
                  <Image src={quantity} alt={""} />
                </div>
              </div>

              <div>
                <div className="text-offWhite md:text-sm text-xs">
                  Quantity Purchased
                </div>
                <div className="text-sm md:text-base text-white font-semibold mt-[10px]">
                  {order?.quantityPurchased}
                </div>
              </div>
            </div>
            <div className="flex  md:gap-6 w-[280px]  md:justify-start ">
              <div className="w-[100px] md:w-auto ">
                <div>
                  <Image src={cost} alt={""} />
                </div>
              </div>
              <div>
                <div className="text-offWhite md:text-sm text-xs">
                  Order Cost
                </div>
                <div className="text-sm md:text-base text-white font-semibold mt-[10px]">
                  {" "}
                  ₦{order?.price}
                </div>
              </div>
            </div>
            <div className="flex  md:gap-6 w-[280px]  md:justify-start">
              <div className="w-[100px] md:w-auto ">
                <div>
                  <Image src={date} alt={""} />
                </div>
              </div>
              <div>
                <div className="text-offWhite md:text-sm text-xs">
                  Date and Time
                </div>
                <div className="text-sm md:text-base text-white font-semibold mt-[10px]">
                  {" "}
                  {order?.expectedDeliveryDate}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box
          sx={{ width: "100%" }}
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
              {MyOrderValue.map(value => (
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
            <BuyerDetails data={order?.buyer} title="Buyer Profile" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductOrderDetails data={order?.product?.product} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BuyerDetails
              data={order?.product?.merchant}
              title="Merchant Information"
            />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const orderId = context.params.orderId;
  return {
    props: {
      orderId,
    },
  };
};
export default OneOrder;
