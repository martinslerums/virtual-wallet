import styles from "./RecentTransactions.module.css"

type RecentTransactionsProps = {
  title: string;
  wallet_id: string
}

const getTransactions = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`);
  }

  return response.json();
};

const RecentTransactions = async ({title, wallet_id}: RecentTransactionsProps) => {
  
  const transactions = await getTransactions(wallet_id);

  return ( 
    <div className={styles.wrapper}>
    <p className={styles.title}>{title}</p>
    
      {transactions && transactions
        .slice(0, 3)
        .map((transaction:Transaction) => 
          <div key={transaction._id} className={styles.transaction}>
            <p className={styles.amount}>{transaction.amount} </p>
            <p className={styles.description}>{transaction.description} </p>
          </div>
        )}
    </div>
   );
}
 
export default RecentTransactions;