import WalletStatistics from "./WalletStatistics";

const getTransactions = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`);
  }

  return response.json();
};

const WalletStatisticsPage = async ({ params: { id } }: Params) => {

  const data = await getTransactions(id)

  return (  
    <WalletStatistics transactions={data}/>
  );
}
 
export default WalletStatisticsPage;