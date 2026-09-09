import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import DataFilterTable from "../DataTable";
import StatusCell from "../StatusCell";

const SosReportTable = ({ data }: any) => {
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
      id: client?.sosDetails?.sosID,
      location: client?.sosDetails?.sosLocation,
      emergencyType: client?.sosDetails?.emergencyType,
      date: moment(client?.sosDetails?.createdAt)?.format("lll"),
      initiatedBy: client?.sosDetails?.initiatedBy?.fullName,
      status: client?.sosDetails?.status,
      reportedFrom: client?.reportedFrom,
      message: client?.message,
      reportTime: moment(client?.reportTime)?.format("lll"),
      acceptedBy: client?.sosDetails?.sosAcceptedBy?.[0]?.fullName,
    };
  });
  const columnDasboard = [
    {
      name: "SOS ID",
      selector: "id",
    },
    {
      name: "SOS Date",
      selector: "date",
    },
    {
      name: "Report Time",
      selector: "reportTime",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Emergency type",
      selector: "emergencyType",
    },
    {
      name: "Initiated By",
      selector: "initiatedBy",
    },
    {
      name: "Accepted By",
      selector: "acceptedBy",
    },
    {
      name: "Reported From",
      selector: "reportedFrom",
    },
    {
      name: "Message",
      selector: "message",
    },
    {
      name: "Status",
      selector: (row: { status: string }) => {
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

export default SosReportTable;
