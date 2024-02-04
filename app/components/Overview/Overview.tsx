import RecentTransactions from "../RecentTransactions/RecentTransactions";
import WalletCard from "../WalletCard/WalletCard";
import styles from "./Overview.module.css";

type OverviewProps = {
  wallets: Wallet[];
  transactions: Transaction[];
};

const Overview = ({ wallets, transactions }: OverviewProps) => {
  return (
    <main className={styles.container}>
      {wallets.map((wallet: Wallet) => (
        <WalletCard
          key={wallet._id}
          wallet={wallet}
          transactions={transactions}
        />
      ))}
    </main>
  );
};

export default Overview;

{
  /* <RecentTransactions title='Recent transactions' wallet_id={wallet._id}/>
        </WalletCard> */
}


