import { useRouter } from "next/router";
import { useAppDispatch } from "src/Hooks/use-redux";

import { deletejob, editjob } from "src/redux/store/features/job-slice";

import { uiActions } from "../redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import AddJob from "./Forms/AddJob";

import ModalAction from "./ModalContent/ModalAction";

const JobList = ({ job, type = "" }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-end pb-5 gap-3 z-30 relative">
      {" "}
      <button className="text-sm text-lightPurple border-2 border-lightPurple py-3 px-4 rounded-md flex items-center justify-center">
        <ActionMenuBase
          items={
            <>
              <ActionMenuItem
                name="Update Job"
                onClickFunction={() => {
                  dispatch(
                    uiActions.openDrawerAndSetContent({
                      drawerContent: (
                        <>
                          <AddJob id={job?.jobID} title="Update Job Posting" />
                        </>
                      ),
                    })
                  );
                }}
              />

              {job?.isActive === true ? (
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
                                    jobID: job?.jobID,
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
                                    jobID: job?.jobID,
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
                              dispatch(deletejob(job?.jobID))
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
          text="Action"
        />
        <span
          style={{ marginLeft: "5px", fontSize: "20px", translate: "0 -4px" }}
        >
          &#8964;
        </span>
      </button>
      <button
        className="text-sm text-white bg-lightPurple py-3 px-4 rounded-md flex items-center justify-center"
        onClick={() => router.back()}
      >
        <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
        Back to List
      </button>
    </div>
  );
};
export default JobList;
