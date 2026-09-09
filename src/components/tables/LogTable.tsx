import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import DataFilterTable from "../DataTable";

const LogTable = ({ data, fetchAll, type = "", userId }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const formatData = data?.slice().map((client: any) => {
    return {
      id: client.logsID,
      action: client.action,
      modelAffected: client.modelAffected,
      date: moment(client.date).format("ll"),
    };
  });
  const columnDasboard = [
    {
      name: "Log ID",
      selector: "id",
    },
    {
      name: "Action",
      selector: "action",
    },
    {
      name: "Model Affected",
      selector: "modelAffected",
    },
    {
      name: "Date",
      selector: "date",
    },
  ];

  return (
    <div className="mt-10">
      <DataFilterTable columns={columnDasboard} data={formatData} />
    </div>
  );
};

export default LogTable;
