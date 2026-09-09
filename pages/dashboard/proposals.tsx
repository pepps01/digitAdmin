import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import ProposalTable from "src/components/tables/ProposalTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  getMyproposal,
} from "src/redux/store/features/proposal-slice";
import { uiActions } from "src/redux/store/ui-slice";

const Proposals = () => {
  const dispatch = useAppDispatch();
  const { proposals, loading, error } = useAppSelector(
    (state: any) => state.proposal
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
  }, [loading, error, dispatch]);
  useEffect(() => {
    dispatch(getMyproposal(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
      <div>
        <ProposalTable data={proposals} />
      </div>
    </ParentContainer>
  );
};
export default Proposals;
