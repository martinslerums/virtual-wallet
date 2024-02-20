import { headers } from "next/headers";
import Overview from "./overview";

const getWallets = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/wallets", {
      cache: "no-store",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wallets from route-handler");
    }

    return response.json();
  } catch (error) {

    console.error("Error fetching wallets:", error);
  }
};

const getTransactions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/transactions", {
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch transactions from route-handler");
    }

    return response.json();
  } catch (error) {
    
    console.error("Error fetching transactions:", error);
  }
};

const OverviewPage = async () => {
  const wallets = await getWallets();
  const transactions = await getTransactions();
  

  return <Overview wallets={wallets} transactions={transactions} />;
};

export default OverviewPage;
