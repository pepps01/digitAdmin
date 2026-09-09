import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  adminType,
  consumerType,
  driverType,
  merchantType,
  riderType,
} from "src/@types/data"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import {
  changeVehicleStatus,
  deleteuser,
  edituser,
} from "src/redux/store/features/user-slice"
import { uiActions } from "src/redux/store/ui-slice"
import ActionMenuBase from "../ActionMenu/ActionMenuBase"
import ActionMenuItem from "../ActionMenu/ActionMenuItem"
import DataFilterTable from "../DataTable"
import AddJob from "../Forms/AddJob"
import AddService from "../Forms/AddService"
import AddUser from "../Forms/AddUser"
import CreateProduct from "../Forms/CreateProduct"
import ModalAction from "../ModalContent/ModalAction"
import StatusModal from "../ModalContent/StatusModal"
import StatusCell from "../StatusCell"

type Prop = {
  data:
    | driverType[]
    | riderType[]
    | merchantType[]
    | consumerType[]
    | adminType[]
  type: string | null
  action: string | null
  userType?: string
}

const UserTable = ({
  data,
  type = "",
  action = "",
  userType = "all",
}: Prop) => {
  const [userId, setUserId] = useState()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [columnArray, setColumnArray] = useState<any[]>([])

  const {
    success,
    loading,
    loadingCategory,
    loadingEdit,
    loadingDelete,
    error,
    message,
    states,
    merchantCategory,
  } = useAppSelector((state: any) => state.user)

  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddUser
              title={`Add ${userType === "all" ? "User" : userType}`}
              user={userType === "all" ? "user" : userType}
            />
          </>
        ),
      })
    )
  }

  type Data = {
    userID: number
    serial: number
    firstname: string
    lastname: string
    fullName: string
    phoneNumber: string
    applicationName: string
    gender: string
    category: string
    phone: string
    email: string
    role: string
    status: string
    emailVerifiedStatus: string
    dateAdded: string
    profile: {
      merchantCategory: string
      isVerified?: boolean
      isSuspended?: boolean
      vehicle?: any
      driverID?: string
      merchantID?: string
    }
    isActive: boolean
  }

  const formatData = data?.slice(0).map((client: any, index: any) => {
    let additionalData = {}

    // if (userType === "all") {
    //   additionalData = {
    //     applicationName: client.applicationName,
    //     role: client.role,
    //   };
    // }
    if (client?.role?.toLowerCase() === "driver") {
      additionalData = {
        isVerified: client.profile.isVerified ? "Approved" : "Not Approved",
        isSuspended: client.profile.isSuspended ? "Suspended" : "Not Suspended",
        vehicleStatus: client?.profile?.vehicle?.status || "Not Set",
        vehicleYear: client?.profile?.vehicle?.year || "Not Set",
        driverID: client?.profile?.driverID,
        vehicleID: client?.profile?.vehicle?.vehicleID,
      }
    }

    return {
      id: client.userID,
      serial: index + 1,
      gender: client.gender,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      emailVerifiedStatus: client.emailVerifiedStatus,
      merchantID: client.role === "merchant" ? client.profile.merchantID : null,
      isActive: client.isActive ? "Active" : "Inactive",
      dateAdded: moment(client.dateAdded).format("ll"),
      applicationName: client.applicationName,
      role: client.role,
      ...additionalData,
    }
  })

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
      name: "Email Verification",
      selector: (row: { emailVerifiedStatus: any }) => (
        <div className="capitalize">{row.emailVerifiedStatus}</div>
      ),
    },
    {
      name: "Status",
      selector: (row: { isActive: string }) => {
        return <StatusCell status={row.isActive} />
      },
    },
  ]
  // const columnUser = columnUsers?.filter(item => item.name !== "Action");

  const columnRole = columnUsers?.filter(
    (item) => item.name !== "Role" && item.name !== "Application Name"
  )

  const columnDriver: any = [
    ...columnRole,
    {
      name: "Vehicle Status",
      selector: (row: { vehicleStatus: any }) => (
        <div className="capitalize">{row.vehicleStatus}</div>
      ),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row: { isVerified: any }) => `${row.isVerified}`,
      sortable: true,
    },
    {
      name: "Suspension",
      selector: (row: { isSuspended: any }) => `${row.isSuspended}`,
      sortable: true,
    },
  ]

  const setColumns = (userType: string, action: string) => {
    if (action === "none") {
      return columnUsers
    } else {
      let column = columnUsers
      if (userType === "all") {
        column = columnUsers
      } else if (
        userType?.toLowerCase() !== "driver" &&
        userType?.toLowerCase() !== "all"
      ) {
        column = columnRole
      } else {
        column = columnDriver
      }
      return [
        ...column,
        {
          name: "Action",
          selector: (row: { action: any }) => `${row.action}`,

          cell: (prop: any) => {
            return (
              <ActionMenuBase
                items={
                  <>
                    <ActionMenuItem
                      name="View More"
                      onClickFunction={() => {
                        router.push(`${location.pathname}/${prop?.id}`)
                      }}
                    />
                    {/* <ActionMenuItem
                      name="Update User"
                      onClickFunction={() => {
                        dispatch(
                          uiActions.openDrawerAndSetContent({
                            drawerStyles: {
                              padding: 0,
                            },
                            drawerContent: (
                              <>
                                <AddUser id={prop.id} title="Update User" />
                              </>
                            ),
                          })
                        )
                      }}
                    /> */}
                    {prop?.role?.toLowerCase() === "driver" &&
                      prop?.vehicleYear >= 2007 && (
                        <ActionMenuItem
                          name="Change Vehicle Status"
                          onClickFunction={() =>
                            dispatch(
                              uiActions.openModalAndSetContent({
                                modalStyles: {
                                  padding: 0,
                                },
                                modalContent: (
                                  <>
                                    <StatusModal
                                      status={prop?.vehicleStatus}
                                      year={prop?.vehicleYear}
                                      actionFunction={(status: any) =>
                                        dispatch(
                                          changeVehicleStatus({
                                            status,
                                            userID: prop?.vehicleID,
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
                    {prop?.isVerified === "Approved" &&
                    prop?.role?.toLowerCase() === "driver" ? (
                      <ActionMenuItem
                        name="Withdraw Approval"
                        onClickFunction={() =>
                          dispatch(
                            uiActions.openModalAndSetContent({
                              modalStyles: {
                                padding: 0,
                              },
                              modalContent: (
                                <>
                                  <ModalAction
                                    action="withdraw drivers approval"
                                    item=""
                                    loading={loadingEdit}
                                    actionFunction={() =>
                                      dispatch(
                                        edituser({
                                          endpoint: "unapprove-driver",
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
                        name="Approve"
                        onClickFunction={() =>
                          dispatch(
                            uiActions.openModalAndSetContent({
                              modalStyles: {
                                padding: 0,
                              },
                              modalContent: (
                                <>
                                  <ModalAction
                                    action="approve"
                                    item="driver"
                                    loading={loadingEdit}
                                    actionFunction={() =>
                                      dispatch(
                                        edituser({
                                          endpoint: "approve-driver",
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
                    {prop?.isSuspended === "Suspended" &&
                    prop?.role === "driver" ? (
                      <ActionMenuItem
                        name="Withdraw Suspension"
                        onClickFunction={() =>
                          dispatch(
                            uiActions.openModalAndSetContent({
                              modalStyles: {
                                padding: 0,
                              },
                              modalContent: (
                                <>
                                  <ModalAction
                                    action="withdraw suspension"
                                    item=""
                                    loading={loadingEdit}
                                    actionFunction={() =>
                                      dispatch(
                                        edituser({
                                          endpoint: "unsuspend-driver",
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
                        name="Suspend"
                        onClickFunction={() =>
                          dispatch(
                            uiActions.openModalAndSetContent({
                              modalStyles: {
                                padding: 0,
                              },
                              modalContent: (
                                <>
                                  <ModalAction
                                    action="suspend"
                                    item="driver"
                                    loading={loadingEdit}
                                    actionFunction={() =>
                                      dispatch(
                                        edituser({
                                          endpoint: "suspend-driver",
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
                          console.log(prop)
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
                          )
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
                          )
                        }}
                      />
                    )}
                    {prop?.role === "merchant" && (
                      <ActionMenuItem
                        name="Create Job posting"
                        onClickFunction={() => {
                          setUserId(prop?.id)
                          dispatch(
                            uiActions.openDrawerAndSetContent({
                              drawerStyles: {
                                padding: 0,
                              },
                              drawerContent: (
                                <>
                                  <AddJob
                                    id={prop.id}
                                    title="Create Job Posting"
                                  />
                                </>
                              ),
                            })
                          )
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
                                  loading={loadingDelete}
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
            )
          },
        },
      ]
    }
  }

  useEffect(() => {
    const result = setColumns(userType, action)
    setColumnArray(result)
  }, [userType, action])
  useEffect(() => {
    if (loading === true || loadingEdit === true) {
      dispatch(uiActions.openLoader())
    }
    if (loading === false || loadingEdit === false) {
      dispatch(uiActions.closeLoader())
    }
  }, [dispatch, loading, loadingEdit])
  return (
    <div>
      {type !== "dashboard" && (
        <button
          onClick={toggleDrawer}
          className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center mt-6"
        >
          Add {userType === "all" ? "User" : userType}
        </button>
      )}
      <div className="mt-4">
        <DataFilterTable columns={columnArray} data={formatData} />
      </div>
    </div>
  )
}

export default UserTable
