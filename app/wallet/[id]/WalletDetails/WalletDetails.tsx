import TransactionList from "@/app/wallet/[id]/TransactionList/TransactionList";
import styles from "./WalletDetails.module.css";
import TransactionForm from "@/app/wallet/[id]/TransactionForm/TransactionForm";

const getWallet = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch wallet with ID: ${id}. Status: ${response.status}`
    );
  }

  return response.json();
};

const getTransactions = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`);
  }

  return response.json();
};

const WalletDetails = async ({ params: { id } }: Params) => {

  const {name, balance} = await getWallet(id);
  const transactions = await getTransactions(id);

  return (
    <main className={styles.container}>
      <h1>{name}</h1>
      <div className={styles.balance_wrapper}>
        <h2 className={styles.balance}> Wallet balance: {balance === 0 ? 0 : balance.toFixed(2)}</h2>
      </div>
      <TransactionList transactions={transactions}/>
      <TransactionForm walletId={id} />
    </main>
  );
};

export default WalletDetails;
