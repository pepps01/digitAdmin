import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "src/Hooks/use-redux";
import { deleteOrder, editorder } from "src/redux/store/features/order-slice";
import { uiActions } from "../redux/store/ui-slice";
import ActionMenuBase from "./ActionMenu/ActionMenuBase";
import ActionMenuItem from "./ActionMenu/ActionMenuItem";
import ModalAction from "./ModalContent/ModalAction";

const OrderList = ({ order }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-end pb-5 gap-3 z-30 relative">
      {" "}
      <button className="text-sm text-darkPurple border-2 border-darkPurple py-3 px-4 rounded-md flex items-center justify-center">
        <ActionMenuBase
          items={
            <>
              {(order?.status === "Pending" ||
                order?.status === "Rejected") && (
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
                                    orderID: order?.orderID,
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

              {(order?.status === "Pending" ||
                order?.status === "Accepted") && (
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
                                    orderID: order?.orderID,
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
                              dispatch(deleteOrder(order?.orderID))
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
export default OrderList;
