import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "src/Hooks/use-redux";
import DataFilterTable from "../DataTable";
import StatusCell from "../StatusCell";

const SosTable = ({ data }: any) => {
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
      id: client?.sosID,
      location: client?.sosLocation,
      emergencyType: client?.emergencyType,
      date: moment(client?.createdAt).format("ll"),
      initiatedBy: client?.initiatedBy?.fullName,
      status: client?.status,
      driver: client?.driver?.full_name,
      rider: client?.rider?.full_name,
      acceptedBy: client?.sosAcceptedBy[0]?.fullName,
    };
  });
  const columnDasboard = [
    {
      name: "SOS ID",
      selector: "id",
    },
    {
      name: "Date",
      selector: "date",
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
      name: "Driver",
      selector: "driver",
    },
    {
      name: "Rider",
      selector: "rider",
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

export default SosTable;
