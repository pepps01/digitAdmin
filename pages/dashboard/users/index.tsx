import { memo, useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";

import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchMyuser,
  getMyuser,
  getStates,
} from "src/redux/store/features/user-slice";
import UserTable from "src/components/tables/UserTable";
import { uiActions } from "src/redux/store/ui-slice";
import { GetStaticProps } from "next/types";
import AllUsersTable from "src/components/tables/AllUsersTable";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, success, message, error } = useAppSelector(
    (state: any) => state.user
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
      dispatch(fetchMyuser(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getMyuser(token));
    dispatch(getStates(token));
  }, []);

  return (
    <ParentContainer>
      <div className="">
        <AllUsersTable data={users} type="" action="" />
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  console.log(context);
  return {
    props: {},
  };
};
export default memo(Users);
