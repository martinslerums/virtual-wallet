"use client";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { DataTable } from "@/app/wallet/[id]/TransactionList/data-table";
import { columns } from "@/app/wallet/[id]/TransactionList/columns";
import NewTransactionForm from "@/app/wallet/[id]/NewTransactionForm/NewTransactionForm";
import LineChart from "@/app/components/LineChart/LineChart";
import NewWalletNameForm from "../NewNameForm/NewNameForm";

type WalletDetailsProps = {
  transactions: Transaction[];
  wallet: Wallet;
};

const WalletDetails = ({ transactions, wallet }: WalletDetailsProps) => {
  const { name, balance, _id: id } = wallet;
  const [editMode, setEditMode] = useState(false);

  const isEditing = () => {
    setEditMode(false);
  };
  // Still gotta use this functionallity somewhere
  const handleWalletDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }

    return response.json();
  };

  return (
    <section className="flex flex-col py-2.5 px-36 gap-2.5 border">
      <div className="flex gap-5 p-2.5 justify-between border">
        <div className="flex flex-col gap-2 w-full">
          {editMode ? (
            <div className="flex p-2 w-auto">
              <NewWalletNameForm wallet={wallet} isEditing={isEditing} />
            </div>
          ) : (
            <div className="flex py-2 w-auto">
              <h1 className="text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                {name}
              </h1>

              <button onClick={() => setEditMode(true)}>
                <CiEdit className="text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
              </button>
            </div>
          )}

          <div className="flex flex-col p-2 max-w-md max-h-36 w-full h-full gap-2.5 rounded-md shadow-md">
            <p className="flex justify-start text-xl sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Wallet balance:
            </p>
            <div className="flex justify-center align-center">
              <h1 className="text-5xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                {balance === 0 ? 0 : balance.toFixed(2)}
              </h1>
            </div>
          </div>
        </div>
        <div className="max-w-lg w-full">
          <LineChart transactions={transactions} />
        </div>
      </div>
      <div className="flex gap-5 p-2.5 justify-between border min-h-[319px]">
        <div className="grow">
          <DataTable columns={columns} data={transactions} />
        </div>
        <div className="">
          <NewTransactionForm walletID={id} />
        </div>
      </div>
    </section>
  );
};

export default WalletDetails;
