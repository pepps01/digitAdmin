import { useCallback, useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import { useAppDispatch } from "src/Hooks/use-redux";
import { orderApi } from "../api";
import OrderTable from "../tables/OrderTable";

const OrderHistory = ({ data, id, role }: any) => {
  const [orders, setOrders] = useState<any>([]);
  const request = useHTTPGet();

  const fetchOrdersByAMerchant = useCallback(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `${orderApi}/orders-for-merchant/${id}`;
    const dataFunction = (res: any) => {
      setOrders(res.data.data);
    };
    request({ url, accessToken }, dataFunction);
  }, [request]);

  useEffect(() => {
    if (role === "merchant") {
      fetchOrdersByAMerchant();
    }
  }, []);
  return (
    <div className="">
      <OrderTable data={role === "merchant" ? orders : data} type="history" />
    </div>
  );
};
export default OrderHistory;
