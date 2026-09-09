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

const TripTable = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formatData = data?.slice(0).map((client: tripType, index: number) => {
    return {
      id: client?.tripID,
      serial: index + 1,
      pickup: client?.pickupLocation,
      dropoff: client?.dropoffLocation,
      basePrice: client?.totalPrice ? client?.totalPrice : client?.basePrice,
      tripDuration: `${client?.tripDuration} mins`,
      driver: client?.driver?.fullName,
      rider: client?.rider?.fullName,
      status: client?.status,
      tripDate: moment(client?.tripDate).format("ll"),
    };
  });
  const columnTrips = [
    {
      name: "Trip ID",
      selector: (row: any) => `${row.id}`,
      sortable: true,
    },
    {
      name: "Trip Date",
      selector: (row: any) => `${row.tripDate}`,
      sortable: true,
    },
    {
      name: "Driver",
      selector: (row: any) => `${row.driver}`,
      sortable: true,
    },
    {
      name: "Rider",
      selector: (row: any) => `${row.rider}`,
      sortable: true,
    },
    {
      name: "Pick Up",
      selector: (row: any) => `${row.pickup}`,
      sortable: true,
    },
    {
      name: "Drop Off",
      selector: (row: any) => `${row.dropoff}`,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row: any) => `${row.tripDuration}`,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: any) => `₦${row.basePrice}`,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: { status: string }) => {
        return <StatusCell status={row.status} />;
      },
      sortable: true,
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
                    router.push(`${location.pathname}/${prop?.id}`);
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

export default TripTable;
