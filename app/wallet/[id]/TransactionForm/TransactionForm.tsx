'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";
import styles from "./TransactionForm.module.css";

const initialTransactionValues = {
  amount: "",
  description: "",
  type: "",
};

type TransactionFormProps = {
  walletId: string
}

const TransactionForm = ({walletId}: TransactionFormProps) => {

  const router = useRouter()
  const [transactionValues, setTransactionValues] = useState(initialTransactionValues);

  const handleTransactionAdd = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(transactionValues.amount),
          description: transactionValues.description,
        }),
      }
    );
    const data = await response.json();
    console.log("handleTransactionAdd: ", data)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionValues({
      ...transactionValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form 
      className={styles.form} 
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        handleTransactionAdd(walletId);
        setTransactionValues(initialTransactionValues);
        router.refresh()
      }}
    >
      <Input
        type="number"
        name="amount"
        onChange={handleInputChange}
        value={transactionValues.amount}
        required
      />
      <Input
        type="text"
        name="description"
        onChange={handleInputChange}
        value={transactionValues.description}
        size="large"
        required
      />
      <Button 
        type="submit" 
        label="Add transaction"
      />
    </form>
  );
};

export default TransactionForm;
