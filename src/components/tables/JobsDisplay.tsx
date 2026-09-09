import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  deletejob,
  editjob,
} from "src/redux/store/features/job-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import AddJob from "../Forms/AddJob";
import ModalAction from "../ModalContent/ModalAction";
import StatusCell from "../StatusCell";

const JobsDisplay = ({ jobs, type = "" }: any) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { loading, success, message, error } = useAppSelector(
    (state: any) => state.job
  );
  console.log(jobs);
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
          backgroundColor: "rgba(24, 160, 251, 1)",
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  const formatData = jobs?.slice(0).map((client: any) => {
    return {
      id: client.jobID,
      headline: client.headline,
      jobDuration: client.jobDuration,
      experienceLevel: client.experienceLevel,
      description: client.description,
      budget: client.budget,
      jobScope: client.jobScope,
      isActive: client.isActive ? "Active" : "Inactive",
      isBudgetNegotiable: client.isBudgetNegotiable,
      datePosted: moment(client.datePosted).format("ll"),
      skillsNeeded: client.skillsNeeded,
    };
  });
  const columnDasboard = [
    {
      name: "#",
      selector: "id",
    },
    {
      name: "Headline",
      selector: "headline",
    },
    {
      name: "Experience Level",
      selector: "experienceLevel",
    },
    {
      name: "Job Duration",
      selector: "jobDuration",
    },
    {
      name: "Budget",
      selector: "budget",
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.budget || 0))}</div>
      ),
    },

    {
      name: "Job Scope",
      selector: "jobScope",
    },
    {
      name: "Negotiable",
      selector: "isBudgetNegotiable",
      cell: (prop: any) => (
        <div>
          {" "}
          {prop.isBudgetNegotiable === true ? "Negotiable" : "Non-Negotiable"}
        </div>
      ),
    },
    {
      name: "Date Posted",
      selector: "datePosted",
    },
    {
      name: "Status",
      selector: (row: { isActive: string }) => {
        return <StatusCell status={row.isActive} />;
      },
    },
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                {type !== "profile" && prop?.isActive === true && (
                  <ActionMenuItem
                    name="View More"
                    onClickFunction={() => {
                      router.push(`${location.pathname}/${prop?.id}`);
                    }}
                  />
                )}

                <ActionMenuItem
                  name="Update Job"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerContent: (
                          <>
                            <AddJob id={prop?.id} title="Update Job Posting" />
                          </>
                        ),
                      })
                    );
                  }}
                />

                {prop?.isActive === "Active" ? (
                  <ActionMenuItem
                    name="Deactivate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="deactivate"
                                item="job post"
                                actionFunction={() =>
                                  dispatch(
                                    editjob({
                                      endpoint: "deactivate-job-post",
                                      jobID: prop?.id,
                                    })
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                ) : (
                  <ActionMenuItem
                    name="Activate"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="activate"
                                item="job post"
                                actionFunction={() =>
                                  dispatch(
                                    editjob({
                                      endpoint: "activate-job-post",
                                      jobID: prop?.id,
                                    })
                                  )
                                }
                              />
                            </>
                          ),
                        })
                      )
                    }
                  />
                )}

                <ActionMenuItem
                  name="Delete Job Post"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="delete"
                              item="job post"
                              actionFunction={() =>
                                dispatch(deletejob(prop?.id))
                              }
                            />
                          </>
                        ),
                      })
                    )
                  }
                />
              </>
            }
          />
        );
      },
    },
  ];

  return (
    <div className="mt-10">
      <DataFilterTable data={formatData} columns={columnDasboard} />
    </div>
  );
};

export default JobsDisplay;
