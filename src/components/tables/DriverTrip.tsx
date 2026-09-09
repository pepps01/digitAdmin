import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { tripType } from "src/@types/data";
import { useAppDispatch } from "src/Hooks/use-redux";
import { deleteTrip } from "src/redux/store/features/trip-slice";
import { uiActions } from "src/redux/store/ui-slice";
import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import DataFilterTable from "../DataTable";
import ModalAction from "../ModalContent/ModalAction";
import StatusCell from "../StatusCell";

type Props = {
  data: tripType[];
};

const DriverTrip = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formatData = data?.slice(0).map((client: tripType, index: number) => {
    return {
      id: client.tripID,
      serial: index + 1,
      pickup: client.pickupLocation,
      dropoff: client.dropoffLocation,
      basePrice: client.basePrice,
      tripDuration: `${client.tripDuration} mins`,
      rider: client.rider.fullName,
      status: client.status,
      tripDate: moment(client.tripDate).format("ll"),
    };
  });
  const columnTrips = [
    {
      name: "Trip ID",
      selector: (row: any) => `${row.id}`,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Trip Date",
      selector: (row: any) => `${row.tripDate}`,
      sortable: true,
      maxWidth: "100px",
    },

    {
      name: "Rider",
      selector: (row: any) => `${row.rider}`,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Pick Up",
      selector: (row: any) => `${row.pickup}`,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "Drop Off",
      selector: (row: any) => `${row.dropoff}`,
      sortable: true,
      maxWidth: "150px",
    },

    {
      name: "Status",
      selector: (row: { status: string }) => {
        return <StatusCell status={row.status} />;
      },
      sortable: true,
      maxWidth: "80px",
    },
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
                    router.push(`trips/${prop?.id}`);
                  }}
                />

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
                              item="trip"
                              actionFunction={() =>
                                dispatch(
                                  deleteTrip({
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
        );
      },
    },
  ];
  return (
    <div className="mt-14">
      <DataFilterTable columns={columnTrips} data={formatData} />
    </div>
  );
};

export default DriverTrip;
