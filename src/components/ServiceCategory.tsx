import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "src/Hooks/use-redux";

import {
  clearError,
  clearMessage,
  deleteserviceCategory,
  editserviceCategory,
  fetchServiceCategories,
  getMyserviceCategories,
} from "src/redux/store/features/service-category-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import DataFilterTable from "./DataTable";
import AddServiceCategory from "./Forms/AddServiceCategory";
import ModalAction from "./ModalContent/ModalAction";

const ServiceCategory = () => {
  const dispatch = useAppDispatch();
  const { serviceCategories, loading, error, message, success } = useSelector(
    (state: any) => state.serviceCategory
  );
  const { token } = useSelector((state: any) => state.auth);

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddServiceCategory />
          </>
        ),
      })
    );
  };
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
      dispatch(uiActions.closedrawer());
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "rgba(24, 160, 251, 1)",
        })
      );
      dispatch(fetchServiceCategories(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMyserviceCategories(token));
  }, [dispatch, token]);

  type Data = {
    categoryID: number;
    serial: number;
    name: string;
    isActive: boolean;
  };
  const formatData = serviceCategories
    ?.slice(0)
    .reverse()
    .map((client: Data, index: number) => {
      return {
        id: client?.categoryID,
        serial: index + 1,
        isActive: client.isActive ? "Active" : "Inactive",
        name: client?.name,
      };
    });
  const columnServiceCategory = [
    {
      name: "#",
      selector: "serial",
      Filter: false,
    },
    {
      name: "Category Name",
      selector: "name",
    },
    {
      name: "Status",
      selector: "isActive",
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
                <ActionMenuItem
                  name="Update Category"
                  onClickFunction={() => {
                    console.log(prop);
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddServiceCategory type="edit" id={prop?.id} />
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
                                item="category"
                                actionFunction={() =>
                                  dispatch(
                                    editserviceCategory({
                                      endpoint: "deactivate-category",
                                      serviceCategoryID: prop?.id,
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
                                item="category"
                                actionFunction={() =>
                                  dispatch(
                                    editserviceCategory({
                                      endpoint: "activate-category",
                                      serviceCategoryID: prop?.id,
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
                  name="Delete Category"
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
                              item="category"
                              actionFunction={() =>
                                dispatch(deleteserviceCategory(prop?.id))
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
    <div>
      <div>
        {" "}
        <button
          onClick={toggleDrawer}
          className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center"
        >
          <span style={{ marginRight: "3px", translate: "0 3px" }}>
            {/* <Image src={Add} alt="" /> */}
          </span>
          Create Category
        </button>
      </div>
      <DataFilterTable columns={columnServiceCategory} data={formatData} />
    </div>
  );
};

export default ServiceCategory;
