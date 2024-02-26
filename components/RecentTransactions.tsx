import { format } from "date-fns"

type RecentTransactionsProps = {
  title: string;
  wallet_id: string;
  wallet_currency: string;
  transactions: Transaction [];
}

const RecentTransactions = ({title, wallet_id, wallet_currency, transactions}: RecentTransactionsProps) => {
  const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.wallet._id === wallet_id);

  return (
    <div className="flex flex-col gap-2.5 h-full border-red-500 border">

      <p>{title}</p>

      {filteredTransactions.length > 0 ? (
        filteredTransactions.slice(0, 3).map((transaction: Transaction) => {
          const formattedAmount = wallet_currency === "EUR"
            ? new Intl.NumberFormat("en-EU", {
                style: "currency",
                currency: "EUR",
              }).format(transaction.amount)
            : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(transaction.amount);
          return (
            <div key={transaction._id} className="flex gap-2 items-stretch  border-yellow-600 border">
              <p>{formattedAmount}</p>
              <p>{format(transaction.createdAt, "dd.MM.yyyy hh:mm")}</p>
            </div>
          );
        })
      ) : (
        <p>No recent transactions</p>
      )}
    </div>
  );
  
}
 
export default RecentTransactions;


