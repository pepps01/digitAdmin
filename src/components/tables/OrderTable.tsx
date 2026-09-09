import ActionMenuBase from "../ActionMenu/ActionMenuBase";

import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";

import moment from "moment";
import { uiActions } from "src/redux/store/ui-slice";
import ModalAction from "../ModalContent/ModalAction";
import {
  clearError,
  clearMessage,
  deleteOrder,
  editorder,
  fetchOrder,
} from "src/redux/store/features/order-slice";
import { useRouter } from "next/router";
import { DataFilterTable } from "../DataTable";
import StatusCell from "../StatusCell";

const OrderHistory = ({ data, fetchAllOrders, type }: any) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { loading, success, message, error } = useAppSelector(
    (state: any) => state.order
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
          backgroundColor: "rgba(24, 160, 251, 1)",
        })
      );
      dispatch(fetchOrder({}));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch]);
  const formatData = data?.slice(0).map((client: any, index: number) => {
    return {
      id: client?.orderID,
      serial: client?.serial,
      name: client?.product?.product?.name,
      categoryName: client?.product?.category?.name,
      paymentStatus: client?.paymentStatus,
      phone: client?.phone,
      deliveryAddress: client?.deliveryAddress,
      quantityPurchased: client?.quantityPurchased,
      expectedDeliveryDate: moment(client?.expectedDeliveryDate).format("ll"),
      price: client?.price,
      status: client?.status,
      buyer: client?.buyer,
      product: client?.product,
      isActive: client.isActive,
    };
  });
  const columnOrders = [
    {
      name: "ID",
      selector: "id",
    },
    {
      name: "Product Name",
      selector: "name",
    },
    {
      name: "Payment Status",
      selector: "paymentStatus",
    },
    {
      name: "Phone Number",
      selector: "phone",
    },
    {
      name: "Quantity",
      selector: "quantityPurchased",
    },
    {
      name: "Delivery Date",
      selector: "expectedDeliveryDate",
    },
    {
      name: "Price",
      selector: "price",
    },

    {
      name: "Status",
      selector: (row: { status: string }) => {
        return <StatusCell status={row.status} />;
      },
    },
    {
      name: "Category Name",
      selector: "categoryName",
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
                {type === "main" && (
                  <ActionMenuItem
                    name="View More"
                    onClickFunction={() => {
                      router.push(`${location.pathname}/${prop?.id}`);
                    }}
                  />
                )}
                {(prop?.status === "Pending" ||
                  prop?.status === "Rejected") && (
                  <ActionMenuItem
                    name="Accept Order"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="accept"
                                item="order"
                                actionFunction={() =>
                                  dispatch(
                                    editorder({
                                      endpoint: "accept-order",
                                      orderID: prop?.id,
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

                {(prop?.status === "Pending" ||
                  prop?.status === "Accepted") && (
                  <ActionMenuItem
                    name="Reject Order"
                    onClickFunction={() =>
                      dispatch(
                        uiActions.openModalAndSetContent({
                          modalStyles: {
                            padding: 0,
                          },
                          modalContent: (
                            <>
                              <ModalAction
                                action="reject"
                                item="order"
                                actionFunction={() =>
                                  dispatch(
                                    editorder({
                                      endpoint: "reject-order",
                                      orderID: prop?.id,
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
                  name="Delete Order"
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
                              item="order"
                              actionFunction={() =>
                                dispatch(deleteOrder(prop?.id))
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
    <div className="mt-14">
      <DataFilterTable columns={columnOrders} data={formatData} />
    </div>
  );
};
export default OrderHistory;
