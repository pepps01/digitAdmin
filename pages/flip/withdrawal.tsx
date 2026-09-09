import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import WithdrawalTable from "src/components/tables/WithdrawalTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  getMywithdrawal,
} from "src/redux/store/features/withdrawal-slice";
import { uiActions } from "src/redux/store/ui-slice";

const Withdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals, loading, success, error, message } = useAppSelector(
    (state: any) => state.withdrawal
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
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(getMywithdrawal(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMywithdrawal(token));
  }, [token, dispatch]);
  return (
    <ParentContainer>
      <div>
        <WithdrawalTable data={withdrawals} />
      </div>
    </ParentContainer>
  );
};
export default Withdrawals;
