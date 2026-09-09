import moment from "moment";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";

import { clearError, clearMessage } from "src/redux/store/features/job-slice";
import { deleteTransaction } from "src/redux/store/features/transaction-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { numberWithCommas } from "src/utils/formatNumber";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import ModalAction from "../ModalContent/ModalAction";
import TransactionDetails from "../TransactionDetails";

const TransactionTable = ({ data, type = "" }: any) => {
  const dispatch = useAppDispatch();
  const { loading, success, message, error } = useAppSelector(
    (state: any) => state.transaction
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
  type Data = {
    jobID: number;
    headline: string;
    jobDuration: string;
    experienceLevel: string;
    budget: string;
    jobScope: string;
    isBudgetNegotiable: string;
    datePosted: string;
  };
  const formatData = data?.slice(0).map((client: any) => {
    return {
      id: client.transID,
      serial: client.serial,
      purpose: client.purpose,
      fullname: client.fullname,
      paymentMethod: client.paymentMethod,
      paymentReference: client.paymentReference,
      status: client.status,
      applicationName: client.applicationName,
      amount: client.amount,
      transDate: moment(client.transDate).format("ll"),
    };
  });
  const columnDasboard = [
    {
      name: "Transaction ID",
      selector: "id",
    },
    {
      name: "Serial",
      selector: "serial",
    },
    {
      name: "Full Name",
      selector: "fullname",
    },
    {
      name: "Application Name",
      selector: "applicationName",
    },
    {
      name: "Amount",
      selector: "amount",
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.amount || 0))}</div>
      ),
    },

    {
      name: "Payment Method",
      selector: "paymentMethod",
    },
    {
      name: "Date",
      selector: "transDate",
    },
    {
      name: "Purpose",
      selector: "purpose",
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
                {type !== "profile" && (
                  <ActionMenuItem
                    name="View More"
                    onClickFunction={() => {
                      dispatch(
                        uiActions.openDrawerAndSetContent({
                          drawerContent: (
                            <>
                              <TransactionDetails data={prop} />
                            </>
                          ),
                        })
                      );
                    }}
                  />
                )}

                <ActionMenuItem
                  name="Delete Transaction"
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
                              item="this transaction"
                              actionFunction={() =>
                                dispatch(deleteTransaction(prop?.id))
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

export default TransactionTable;
