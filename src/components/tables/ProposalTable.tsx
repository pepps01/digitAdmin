import moment from "moment";
import React from "react";
import { useAppSelector } from "src/Hooks/use-redux";
import { numberWithCommas } from "src/utils/formatNumber";
import DataFilterTable from "../DataTable";
import StatusCell from "../StatusCell";

const ProposalTable = ({ data }: any) => {
  const formatData = data?.slice(0).map((client: any, index: number) => {
    return {
      id: client.proposalID,
      serial: index + 1,
      paymentOption: client.paymentOption,
      expectedDuration: client.expectedDuration,
      total_price: client.total_price,
      numOfMilestones: client.numOfMilestones,
      amountToReceive: client.amountToReceive,
      paymentStatus: client.paymentStatus,
      status: client.status,
      submissionDate: moment(client.submissionDate).format("ll"),
    };
  });
  const columnDasboard = [
    {
      name: "ID",
      selector: (row: { id: any }) => `${row.id}`,
    },
    {
      name: "Payment Option",
      selector: (row: { paymentOption: any }) => `${row.paymentOption}`,
    },
    {
      name: "Submission Date",
      selector: (row: { submissionDate: any }) => `${row.submissionDate}`,
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: any }) => `${row.paymentStatus}`,
    },
    {
      name: "Num Of Milestones",
      selector: (row: { numOfMilestones: any }) => `${row.numOfMilestones}`,
    },

    {
      name: "Submission Date",
      selector: (row: { submissionDate: any }) => `${row.submissionDate}`,
    },
    {
      name: "Total Price",
      selector: (row: { total_price: any }) => `${row.total_price}`,
      cell: (prop: any) => (
        <div> &#8358; {numberWithCommas(Number(prop.total_price || 0))}</div>
      ),
    },
    {
      name: "Amount To Receive",
      selector: (row: { amountToReceive: any }) => `${row.amountToReceive}`,
      cell: (prop: any) => (
        <div>
          {" "}
          &#8358; {numberWithCommas(Number(prop.amountToReceive || 0))}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row: { status: any }) => {
        return <StatusCell status={row.status} />;
      },
    },
  ];
  return (
    <div className="mt-10">
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default ProposalTable;
