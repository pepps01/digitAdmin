import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import { uiActions } from "../../../src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchOrder,
  getMyOrders,
} from "src/redux/store/features/order-slice";
import OrderTable from "src/components/tables/OrderTable";
import { GetStaticProps } from "next/types";

const Orders = (props: any) => {
  const dispatch = useAppDispatch();
  console.log(props);
  const { orders, loading, error, message, success } = useAppSelector(
    (state: any) => state.order
  );
  const { token } = useAppSelector((state: any) => state.auth);

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
      dispatch(fetchOrder(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getMyOrders(token));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div className="mt-12">
        <OrderTable data={orders} type="main" />
      </div>
    </ParentContainer>
  );
};

export const getServerSideProps: GetStaticProps = async (context: any) => {
  const param = context.resolvedUrl;

  return {
    props: { param: "params" },
  };
};
export default Orders;
