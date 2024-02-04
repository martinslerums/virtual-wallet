import Overview from "./components/Overview/Overview";

const getWallets = async () => {
  const response = await fetch("http://localhost:3000/api/wallets", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wallets from route-handler");
  }

  return response.json();
};

const getTransactions = async () => {
  const response = await fetch("http://localhost:3000/api/transactions", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions from route-handler");
  }

  return response.json();
};

const Home = async () => {
  const wallets = await getWallets();
  const transactions = await getTransactions();

  return (
    <>
      <Overview wallets={wallets} transactions={transactions} />
    </>
  );
};

export default Home;
