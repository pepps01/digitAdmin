import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParentContainer from "src/components/ParentContainer";

import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import AddJob from "src/components/Forms/AddJob";
import {
  clearError,
  clearMessage,
  deleteuser,
  edituser,
  fetchMyRiders,
  fetchMyuser,
  getMyRiders,
  getMyuser,
} from "src/redux/store/features/user-slice";
import UserTable from "src/components/tables/UserTable";
import { uiActions } from "src/redux/store/ui-slice";
import SuccessfulModal from "src/components/ModalContent/SuccessfulModal";

const Users = () => {
  const dispatch = useAppDispatch();
  const { riders, loading, success, message, error } = useAppSelector(
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
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchMyRiders(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getMyRiders(token));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div className="">
        <UserTable data={riders} type="" action="" userType="Rider" />
      </div>
    </ParentContainer>
  );
};
export default memo(Users);
