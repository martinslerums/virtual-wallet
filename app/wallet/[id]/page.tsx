import TransactionList from "./TransactionList/TransactionList";
import WalletDetails from "./WalletDetails/WalletDetails";

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

const WalletDetailsPage = async ({ params: { id } }: Params) => {

  const wallet = await getWallet(id);
  const transactions = await getTransactions(id);

  return (
    <>
      <WalletDetails transactions={transactions} wallet={wallet} />
    </>
  );
};

export default WalletDetailsPage;
