import { useRouter } from "next/router";
import { memo } from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import { deleteuser, edituser } from "src/redux/store/features/user-slice";
import { uiActions } from "../redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import AddJob from "./Forms/AddJob";
import CreateProduct from "./Forms/CreateProduct";
import ModalAction from "./ModalContent/ModalAction";

const ActionList = ({ user, type, setIsOpen }: any) => {
  const accessToken = sessionStorage.getItem("accessToken");

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-end pb-5 gap-3 z-30 relative">
      {" "}
      <button className="text-sm text-darkPurple border-2 border-darkPurple py-3 px-4 rounded-md flex items-center justify-center">
        <ActionMenuBase
          items={
            <>
              {user?.isActive === true ? (
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
                              action="Deactivate"
                              item="user"
                              actionFunction={() =>
                                dispatch(
                                  edituser({
                                    endpoint: "deactivate-user",
                                    userID: user?.userID,
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
                              action="Activate"
                              item="user"
                              actionFunction={() =>
                                dispatch(
                                  edituser({
                                    endpoint: "activate-user",
                                    userID: user?.userID,
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
              {user?.emailVerifiedStatus === "verified" ? (
                <ActionMenuItem
                  name="Unverify Email"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="unverify"
                              item="user"
                              actionFunction={() =>
                                dispatch(
                                  edituser({
                                    endpoint: "unverify-email",
                                    userID: user?.userID,
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
                  name="Verify Email"
                  onClickFunction={() =>
                    dispatch(
                      uiActions.openModalAndSetContent({
                        modalStyles: {
                          padding: 0,
                        },
                        modalContent: (
                          <>
                            <ModalAction
                              action="verify"
                              item="user"
                              actionFunction={() =>
                                dispatch(
                                  edituser({
                                    endpoint: "verify-email",
                                    userID: user?.userID,
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
              {user?.role === "merchant" && (
                <ActionMenuItem
                  name="Create Product"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <CreateProduct
                              id={user?.userID}
                              title="Create Product"
                            />
                          </>
                        ),
                      })
                    );
                  }}
                />
              )}
              <ActionMenuItem
                name="Create Job posting"
                onClickFunction={() => {
                  dispatch(
                    uiActions.openDrawerAndSetContent({
                      drawerStyles: {
                        padding: 0,
                      },
                      drawerContent: (
                        <>
                          <AddJob userId={user?.userID} />
                        </>
                      ),
                    })
                  );
                }}
              />

              <ActionMenuItem
                name="Delete"
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
                            item="user"
                            actionFunction={() =>
                              dispatch(
                                deleteuser({
                                  userID: user?.userID,
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
            </>
          }
          text="Actions"
          type="export"
        />
        <span
          style={{ marginLeft: "5px", fontSize: "20px", translate: "0 -4px" }}
        >
          &#8964;
        </span>
      </button>
      <button
        className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center"
        onClick={() => router.back()}
      >
        Back to List
      </button>
    </div>
  );
};
export default memo(ActionList);
