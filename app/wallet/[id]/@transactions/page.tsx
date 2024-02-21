import { columns } from "@/app/components/TransactionList/columns";
import NewTransactionForm from "@/app/components/NewTransactionForm/NewTransactionForm";
import TransactionList from "@/app/components/TransactionList/data-table";

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
      <div className="flex grow h-full max-w-[80%] w-full">
        <TransactionList columns={columns} data={data} />
      </div>
      <div className="h-full max-w-[20%] w-full">
        <NewTransactionForm wallet_id={id} />
      </div>
    </>
  );
}

export default WalletTransactions;
 
