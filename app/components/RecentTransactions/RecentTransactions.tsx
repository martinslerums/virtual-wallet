import styles from "./RecentTransactions.module.css"

type RecentTransactionsProps = {
  title: string;
  wallet_id: string
  transactions: Transaction []
}

const RecentTransactions = async ({title, wallet_id, transactions}: RecentTransactionsProps) => {

  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => transaction.wallet._id === wallet_id
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      {filteredTransactions &&
        filteredTransactions
          .slice(0, 3)
          .map((transaction: Transaction) => (
            <div key={transaction._id} className={styles.transaction}>
              <p className={styles.amount}>{transaction.amount} </p>
              <p className={styles.description}>{transaction.description} </p>
            </div>
          ))}
    </div>
  );
}
 
export default RecentTransactions;