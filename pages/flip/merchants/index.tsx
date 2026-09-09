import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchMymerchant,
  getMymerchant,
} from "src/redux/store/features/user-slice";
import UserTable from "src/components/tables/UserTable";
import { uiActions } from "src/redux/store/ui-slice";

const Merchants = () => {
  const dispatch = useAppDispatch();
  const { merchants, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
  );
  const { token } = useAppSelector((state: any) => state.auth);
  console.log(token);

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
      dispatch(fetchMymerchant(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getMymerchant(token));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div>
        <UserTable data={merchants} type="" action="" userType="Merchant" />
      </div>
    </ParentContainer>
  );
};
export default Merchants;
