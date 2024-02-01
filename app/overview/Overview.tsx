import styles from './Overview.module.css'

type OverviewProps = {
  wallets: Wallet []
  transactions: Transaction []
}

const Overview = ({wallets, transactions }: OverviewProps) => {
  return ( 
    <main className={styles.container}>
      {wallets && wallets.map(({name, balance, currency, _id: wallet_id}: Wallet) => (
        <div key={wallet_id} className={styles.wrapper}>
          <h1>{name}</h1>
          <span>Balance: {balance}</span>
      
          <div className={styles.transaction_wrapper}>
          Recent transactions:
          {transactions && transactions
            .filter((transaction:Transaction)=> transaction.wallet._id === wallet_id)
            .map((transaction:Transaction) => 
              <div key={transaction._id} className={styles.transaction}>
                <p>{transaction.amount} </p>
                <p>{transaction.description} </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
 
export default Overview;