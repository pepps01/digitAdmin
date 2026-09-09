import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  deleteservice,
  editservice,
} from "src/redux/store/features/service-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import AddService from "../Forms/AddService";
import AddServiceImages from "../Forms/AddServiceImages";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";
import ServiceDetails from "../ServiceDetails";
import StatusCell from "../StatusCell";

const ServiceTable = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, success, message, error } = useAppSelector(
    (state: any) => state.service
  );
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
          backgroundColor: "#49D3BA",
        })
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  const toggleDrawer = () => {
    dispatch(
      uiActions.openDrawerAndSetContent({
        drawerStyles: {
          padding: 0,
        },
        drawerContent: (
          <>
            <AddService title="Create Service" />
          </>
        ),
      })
    );
  };
  type Data = {
    service: {
      serviceID: number;
      serial: string;
      serviceName: string;
      phoneNumber: string;
      pricing: string;
      location: string;
      yearsOfExperience: number;
      isActive: boolean;
      datePosted: string;
    };

    category: {
      name: string;
    };
  };
  const formatData = data?.slice(0).map((client: any) => {
    return {
      id: client?.service?.serviceID,
      serial: client?.service?.serial,
      location: client?.service?.location || "--",
      serviceName: client?.service?.serviceName || "--",
      phoneNumber: client?.service?.phoneNumber || "--",
      pricing: client?.service?.pricing || "--",
      isActive: client?.service?.isActive ? "Active" : "Inactive",
      description: client?.service?.description || "--",
      images: client?.service?.images || "--",
      yearsOfExperience: client?.service?.yearsOfExperience || "--",
      categoryName: client?.category?.name || "--",
      merchant: client?.merchant || "--",
      otherDetails: client?.service?.other_details || [],
      datePosted: moment(client?.service?.datePosted).format("ll"),
    };
  });
  const columnDasboard = [
    {
      name: "Serial",
      selector: "serial",
    },
    {
      name: "Service Name",
      selector: "serviceName",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
    },
    {
      name: "Pricing",
      selector: "pricing",
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.pricing || 0))}</div>
      ),
    },

    {
      name: "Years Of Experience",
      selector: "yearsOfExperience",
    },
    {
      name: "Category",
      selector: "categoryName",
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
    ,
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
                  name="View More"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <ServiceDetails data={prop} />
                          </>
                        ),
                      })
                    );
                  }}
                />
                <ActionMenuItem
                  name="Update Service"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerStyles: {
                          padding: 0,
                        },
                        drawerContent: (
                          <>
                            <AddService title="Update Service" id={prop?.id} />
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
                                action="Deactivate"
                                item="service"
                                actionFunction={() =>
                                  dispatch(
                                    editservice({
                                      endpoint: "deactivate-service",
                                      serviceID: prop?.id,
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
                                item="service"
                                actionFunction={() =>
                                  dispatch(
                                    editservice({
                                      endpoint: "activate-service",
                                      serviceID: prop?.id,
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
                  name="Add Service Images"
                  onClickFunction={() => {
                    dispatch(
                      uiActions.openDrawerAndSetContent({
                        drawerContent: (
                          <>
                            <AddServiceImages
                              id={prop?.id}
                              title="Add Service Images"
                            />
                          </>
                        ),
                      })
                    );
                  }}
                />

                <ActionMenuItem
                  name="Delete Service"
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
                              item="service"
                              actionFunction={() =>
                                dispatch(deleteservice(prop?.id))
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
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default ServiceTable;
