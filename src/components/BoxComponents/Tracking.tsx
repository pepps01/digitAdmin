import ActionMenuBase from "../ActionMenu/ActionMenuBase";
import MultipleSelectTable from "../multiple-select-table";

import ActionMenuItem from "../ActionMenu/ActionMenuItem";

const Tracking = () => {
  const columnTransaction = [
    {
      Header: "Transaction ID",
      accessor: "id",
      Filter: false,
    },
    {
      Header: "Amount Paid",
      accessor: "amountPaid",
    },
    {
      Header: "Payment Type",
      accessor: "paymentType",
    },
    {
      Header: "Patient Name",
      accessor: "patientName",
    },

    {
      Header: "Action",
      accessor: "action",
      Filter: false,
      Cell: (prop: any) => {
        return (
          <ActionMenuBase
            items={
              <>
                <ActionMenuItem name="View Details" />

                <ActionMenuItem name="Edit Details" />
              </>
            }
          />
        );
      },
    },
  ];
  return (
    <div>
      <MultipleSelectTable
        columns={columnTransaction}
        data={[]}
        emptyPlaceHolder="No Transactions yet!"
        list
      />
    </div>
  );
};

export default Tracking;
