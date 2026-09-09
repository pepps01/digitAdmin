import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  deleteuser,
  edituser,
  getMyuser,
} from "src/redux/store/features/user-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import AddJob from "../Forms/AddJob";
import AddUser from "../Forms/AddUser";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";
import FilterTable from "../filter-table";
import DataFilterTable from "../DataTable";
import CreateProduct from "../Forms/CreateProduct";
import AddService from "../Forms/AddService";
import {
  adminType,
  consumerType,
  driverType,
  merchantType,
  riderType,
} from "src/@types/data";
import StatusCell from "../StatusCell";

type Prop = {
  data:
    | driverType[]
    | riderType[]
    | merchantType[]
    | consumerType[]
    | adminType[];
  type: string | null;
  action: string | null;
};

const AllUsersTable = ({ data, type = "", action = "" }: Prop) => {
  const [userId, setUserId] = useState();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddUser title="Add User" />
          </>
        ),
      })
    );
  };

  type Data = {
    userID: number;
    serial: number;
    firstname: string;
    lastname: string;
    fullName: string;
    phoneNumber: string;
    applicationName: string;
    gender: string;
    category: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    emailVerifiedStatus: string;
    dateAdded: string;
    profile: {
      merchantCategory: string;
    };
    isActive: boolean;
  };
  const formatData = data?.slice(0).map((client: any, index: number) => {
    return {
      id: client.userID,
      serial: index + 1,
      gender: client.gender,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      applicationName: client.applicationName,
      emailVerifiedStatus: client.emailVerifiedStatus,
      role: client.role,
      merchantID: client.role === "merchant" ? client.profile.merchantID : null,
      isActive: client.isActive ? "Active" : "Inactive",
      dateAdded: moment(client.dateAdded).format("ll"),
    };
  });

  const columnUsers = [
    {
      name: "Full Name",
      selector: (row: { fullName: any }) => `${row.fullName}`,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: { gender: any }) => `${row.gender}`,
    },
    {
      name: "Email Address",
      selector: (row: { email: any }) => `${row.email}`,
    },
    {
      name: "Date Created",
      selector: (row: { dateAdded: any }) => `${row.dateAdded}`,
    },
    {
      name: "Role",
      selector: (row: { role: any }) => `${row.role}`,
    },
    {
      name: "Phone Number",
      selector: (row: { phone: any }) => `${row.phone}`,
    },

    {
      name: "Application Name",
      selector: (row: { applicationName: any }) => `${row.applicationName}`,
    },
    {
      name: "Verification",
      selector: (row: { emailVerifiedStatus: any }) =>
        `${row.emailVerifiedStatus}`,
    },
    {
      name: "Status",
      selector: (row: { isActive: string }) => {
        return <StatusCell status={row.isActive} />;
      },
    },
    {
      name: "Action",
      selector: (row: { action: any }) => `${row.action}`,

      cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
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
                                action="Deactivate"
                                item="user"
                                actionFunction={() =>
                                  dispatch(
                                    edituser({
                                      endpoint: "deactivate-user",
                                      userID: prop?.id,
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
                                      userID: prop?.id,
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
                {prop?.emailVerifiedStatus === "verified" ? (
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
                                      userID: prop?.id,
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
                                      userID: prop?.id,
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
                {prop?.role === "merchant" && (
                  <ActionMenuItem
                    name="Create Product"
                    onClickFunction={() => {
                      console.log(prop);
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerStyles: {
                            padding: 0,
                          },
                          drawerContent: (
                            <>
                              <CreateProduct
                                id={prop.id}
                                merchantID={prop.merchantID}
                                title="Create Product"
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}
                {prop?.role === "merchant" && (
                  <ActionMenuItem
                    name="Create Service"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerStyles: {
                            padding: 0,
                          },
                          drawerContent: (
                            <>
                              <AddService
                                id={prop.id}
                                merchantID={prop.merchantID}
                                title="Create Service"
                              />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}
                {prop?.role === "merchant" && (
                  <ActionMenuItem
                    name="Create Job posting"
                    onClickFunction={() => {
                      setUserId(prop?.id);
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerStyles: {
                            padding: 0,
                          },
                          drawerContent: (
                            <>
                              <AddJob id={prop.id} title="Create Job Posting" />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}

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
                                    id: prop?.id,
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
          />
        );
      },
    },
  ];
  const columnUser = [
    {
      name: "Full Name",
      selector: (row: { fullName: any }) => `${row.fullName}`,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: { gender: any }) => `${row.gender}`,
    },
    {
      name: "Email Address",
      selector: (row: { email: any }) => `${row.email}`,
    },
    {
      name: "Date Created",
      selector: (row: { dateAdded: any }) => `${row.dateAdded}`,
    },
    {
      name: "Role",
      selector: (row: { role: any }) => `${row.role}`,
    },
    {
      name: "Phone Number",
      selector: (row: { phone: any }) => `${row.phone}`,
    },

    {
      name: "Application Name",
      selector: (row: { applicationName: any }) => `${row.applicationName}`,
    },
    {
      name: "Verification",
      selector: (row: { emailVerifiedStatus: any }) =>
        `${row.emailVerifiedStatus}`,
    },
    {
      name: "Status",
      selector: (row: { isActive: string }) => {
        return <StatusCell status={row.isActive} />;
      },
    },
  ];
  return (
    <div>
      {type !== "dashboard" && (
        <button
          onClick={toggleDrawer}
          className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center mt-6"
        >
          Add User
        </button>
      )}
      <div className="mt-4">
        <DataFilterTable
          columns={action === "none" ? columnUser : columnUsers}
          data={formatData}
        />
      </div>
    </div>
  );
};

export default AllUsersTable;
