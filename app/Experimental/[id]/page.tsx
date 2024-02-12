import { columns } from "../../wallet/[id]/TransactionList/columns"
import { DataTable } from "../../wallet/[id]/TransactionList/data-table"

const getTransactions = async (id: string): Promise<Transaction []> => {
  const response = await fetch(
    `http://localhost:3000/api/wallets/${id}/transactions`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`
    );
  }

  return response.json();
};

export default async function DemoPage({params:{id} }: Params ) {
  const data = await getTransactions(id);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
