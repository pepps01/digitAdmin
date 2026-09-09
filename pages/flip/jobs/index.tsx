import { useRouter } from "next/router";
import { useEffect } from "react";
import JobsDisplay from "src/components/tables/JobsDisplay";
import ParentContainer from "src/components/ParentContainer";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchJob,
  getMyjobs,
} from "src/redux/store/features/job-slice";
import { uiActions } from "src/redux/store/ui-slice";

const Jobs = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { jobs, loading, error, message, success } = useAppSelector(
    state => state.job
  );
  const { token } = useAppSelector(state => state.auth);
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
      dispatch(fetchJob(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMyjobs(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
      <div className="mt-12">
        <JobsDisplay jobs={jobs} />
      </div>
    </ParentContainer>
  );
};
export default Jobs;
