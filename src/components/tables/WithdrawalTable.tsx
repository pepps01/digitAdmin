import moment from "moment";
import { useAppDispatch } from "src/Hooks/use-redux";
import {
  deletewithdrawal,
  editwithdrawal,
} from "src/redux/store/features/withdrawal-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { DataFilterTable } from "../DataTable";
import ModalAction from "../ModalContent/ModalAction";
import MultipleSelectTable from "../multiple-select-table";
import StatusCell from "../StatusCell";

const WithdrawalTable = ({ data }: any) => {
  const dispatch = useAppDispatch();
  const formatData = data?.slice(0).map((client: any, index: number) => {
    return {
      id: client.withdrawID,
      serial: index + 1,
      fullName: client.fullname,
      amount: client.amount,
      status: client.status,
      applicationName: client.applicationName,
      rejectionReason: client.rejectionReason || "--",
      dateAdded: moment(client.requestDate).format("ll"),
    };
  });
  const columnDasboard = [
    {
      name: "#",
      selector: (row: { serial: any }) => `${row.serial}`,
      width: "80px",
    },
    {
      name: "ID",
      selector: (row: { id: any }) => `${row.id}`,
    },
    {
      name: "Full Name",
      selector: (row: { fullName: any }) => `${row.fullName}`,
    },
    {
      name: "Reason For Rejection",
      selector: (row: { rejectionReason: any }) => `${row.rejectionReason}`,
    },
    {
      name: "Amount",
      selector: (row: { amount: any }) => `${row.amount}`,
    },

    {
      name: "Request Date",
      selector: (row: { dateAdded: any }) => `${row.dateAdded}`,
    },
    {
      name: "Status",
      selector: (row: { status: string }) => {
        return <StatusCell status={row.status} />;
      },
    },
    {
      name: "Action",
      selector: "action",
      Filter: false,
      cell: (prop: any) => {
        console.log(prop);
        return (
          <ActionMenuBase
            items={
              <>
                {prop?.status !== "Rejected" ? (
                  <>
                    <ActionMenuItem
                      name="Reject"
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
                                  item="withdrawal"
                                  type="reason"
                                  actionFunction={(text: string) =>
                                    dispatch(
                                      editwithdrawal({
                                        endpoint: "reject-withdrawal",
                                        withdrawalID: prop?.id,
                                        data: { rejection_reason: text },
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
                    <ActionMenuItem
                      name="Disburse Fund"
                      onClickFunction={() =>
                        dispatch(
                          uiActions.openModalAndSetContent({
                            modalStyles: {
                              padding: 0,
                            },
                            modalContent: (
                              <>
                                <ModalAction
                                  action="disburse"
                                  item="fund"
                                  actionFunction={() =>
                                    dispatch(
                                      editwithdrawal({
                                        endpoint: "disburse-funds",
                                        withdrawalID: prop?.id,
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
                ) : (
                  <ActionMenuItem
                    name="Accept"
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
                                item="withdrawal"
                                actionFunction={() =>
                                  dispatch(
                                    editwithdrawal({
                                      endpoint: "accept-withdrawal",
                                      withdrawalID: prop?.id,
                                      data: {},
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
                                dispatch(deletewithdrawal(prop?.id))
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
export default WithdrawalTable;
