import { useEffect } from "react";
import Dashboard from "src/components/Dashboard";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getMyjobs } from "src/redux/store/features/job-slice";
import { getAdminlogs } from "src/redux/store/features/log-slice";
import { getMyOrders } from "src/redux/store/features/order-slice";
import { getMyproductCategories } from "src/redux/store/features/product-category-slice";
import { getMyproduct } from "src/redux/store/features/product-slice";
import { getMyproposal } from "src/redux/store/features/proposal-slice";
import { getMyserviceCategories } from "src/redux/store/features/service-category-slice";
import { getMyservice } from "src/redux/store/features/service-slice";
import { getMyTransactions } from "src/redux/store/features/transaction-slice";
import { getMyuser } from "src/redux/store/features/user-slice";
import { getMywithdrawal } from "src/redux/store/features/withdrawal-slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { token, adminDetails } = useAppSelector(state => state.auth);
  const { users }:any = useAppSelector(state => state.user);
  const { transactions } = useAppSelector(state => state.transaction);
  const { orders } = useAppSelector(state => state.order);
  const last10Users = [...users]?.slice(0, 10);

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
