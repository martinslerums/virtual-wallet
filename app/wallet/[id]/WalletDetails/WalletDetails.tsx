"use client";

import TransactionList from "@/app/wallet/[id]/TransactionList/TransactionList";
import TransactionForm from "@/app/wallet/[id]/TransactionForm/TransactionForm";
import Input from "@/app/components/Input/Input";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./WalletDetails.module.css";

type WalletDetailsProps = {
  transactions: Transaction[];
  wallet: Wallet;
};

const WalletDetails = ({transactions, wallet: { name, balance, _id: id }}: WalletDetailsProps) => {

  const router = useRouter()
  const [editMode, setEditMode] = useState(false);
  const [editWalletName, setEditWalletName] = useState(name)

  const handleWalletEdit = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: editWalletName })
    })

    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }

    router.refresh()
    
    return response.json();
  }

  const handleWalletDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }
    
    return response.json();
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditWalletName(e.target.value);
  };
  
  return (
    <main className={styles.container}>
      {editMode ? (
        <div>
          <Input 
            type="text" 
            value={editWalletName} 
            onChange={handleInputChange} 
            required
          />
          <button onClick={() => {
            handleWalletEdit(id);
            setEditMode(false)}}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{name}</h1>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      <div className={styles.balance_wrapper}>
        <h2 className={styles.balance}>
          Wallet balance: {balance === 0 ? 0 : balance.toFixed(2)}
        </h2>
      </div>
      <TransactionList transactions={transactions} />
      <TransactionForm walletId={id} />
    </main>
  );
};

export default WalletDetails;
