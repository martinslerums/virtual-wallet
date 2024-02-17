"use client"

import { columns } from "@/app/components/TransactionList/columns";
import TransactionList from "@/app/components/TransactionList/data-table";
import NewTransactionForm from "@/app/components/NewTransactionForm/NewTransactionForm";

type WalletTransactionsProps = {
  transactions: Transaction [];
  wallet_id: string;
}

const WalletTransactions = ({ transactions, wallet_id }: WalletTransactionsProps) => {

  return (
    <div className="flex gap-5 p-2.5 justify-between border min-h-[319px] h-full">
      <div className="flex-auto">
        <TransactionList columns={columns} data={transactions} />
      </div>
      <div className="flex-auto">
        <NewTransactionForm wallet_id={wallet_id} />
      </div>
    </div>
  );
};

export default WalletTransactions;
