import { useEffect, useState } from "react";
import useHTTPGet from "src/Hooks/use-httpget";
import Dashboard from "src/components/Dashboard";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getMyuser } from "src/redux/store/features/user-slice";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { getMyservice } from "src/redux/store/features/service-slice";
import { getMywithdrawal } from "src/redux/store/features/withdrawal-slice";
import { getMyproposal } from "src/redux/store/features/proposal-slice";
import { getMyjobs } from "src/redux/store/features/job-slice";
import { getMyserviceCategories } from "src/redux/store/features/service-category-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import { getMyTransactions } from "src/redux/store/features/transaction-slice";
import { getAdminlogs } from "src/redux/store/features/log-slice";
import { getMyOrders } from "src/redux/store/features/order-slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { token, adminDetails } = useAppSelector(state => state.auth);
  const { users } = useAppSelector(state => state.user);
  const { transactions } = useAppSelector(state => state.transaction);
  const { orders } = useAppSelector(state => state.order);
  const last10Users = users?.reverse().slice(0, 10);
  console.log(users.slice(10), "lll");

  useEffect(() => {
    dispatch(getMyuser(token));
    dispatch(getMyproduct(token));
    dispatch(getMyservice(token));
    dispatch(getMywithdrawal(token));
    dispatch(getMyproposal(token));
    dispatch(getMyjobs(token));
    dispatch(getMyserviceCategories(token));
    dispatch(getMyproductCategories(token));
    dispatch(getMyTransactions(token));
    dispatch(getAdminlogs({ token, adminDetails }));
    dispatch(getMyOrders(token));
  }, [dispatch, token]);
  return (
    <Dashboard
      recentUsers={last10Users}
      transactions={transactions}
      orders={orders}
      users={users}
    />
  );
};

export default Home;
