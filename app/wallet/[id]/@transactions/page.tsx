import { columns } from "@/components/columns";
import NewTransactionForm from "@/components/NewTransactionForm";
import TransactionList from "@/components/data-table";

const getTransactions = async (id: string) => {

  const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`);
  }


  return response.json();
};

const WalletTransactions = async ({ params: { id } }: Params) =>  {
  
  const data = await getTransactions(id)

  return (
    <>
      <div className="flex grow h-full max-h-[297px] max-w-[80%] w-full">
        <TransactionList columns={columns} data={data} />
      </div>
      <div className="h-full max-w-[20%] w-full">
        <NewTransactionForm wallet_id={id} />
      </div>
    </>
  );
}

export default WalletTransactions;
 
