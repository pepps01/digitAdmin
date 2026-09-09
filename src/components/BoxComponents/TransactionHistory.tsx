import TransactionTable from "../tables/TransactionTable";

const transactionHistory = ({ id, transactions }: any) => {
  return (
    <div className="mt-10">
      <TransactionTable data={transactions} type="profile" />
    </div>
  );
};

export default transactionHistory;
