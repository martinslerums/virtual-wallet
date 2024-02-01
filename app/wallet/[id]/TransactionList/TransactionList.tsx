'use client'

import { compareDesc, format } from "date-fns";
import styles from "./TransactionList.module.css"
import { useState } from "react";
import { useRouter } from "next/navigation";


type TransactionListProps = {
  transactions: Transaction[];
};

const TransactionList = ({ transactions }: TransactionListProps) => {
  const router = useRouter()

  const [fraudulentTransactions, setFraudulentTransactions] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("fraudulentTransactions") || "[]");
  });
  
  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`
      );
    }

    return response.json();
  };

  const handleCheckbox = (id: string) => {
    setFraudulentTransactions((prevFraudulentTransactions) => {

      const isFraudulent = prevFraudulentTransactions.includes(id);

      const updatedRows = isFraudulent
        ? prevFraudulentTransactions.filter((rowId) => rowId !== id)
        : [...prevFraudulentTransactions, id];

      isFraudulent 
        ? localStorage.removeItem("fraudulentTransactions")
        : localStorage.setItem("fraudulentTransactions", JSON.stringify(updatedRows));

      return updatedRows;
    });
  };

  return (
    <div className={`${styles.container}`}>
      <table className={`table table-dark table-hover ${styles.transaction_table}`}>
        <thead className={styles.head}>
          <tr>
            <th>Fraud</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {transactions.map(({ _id, amount, description, type, createdAt }: Transaction) => (
            <tr
              key={_id}
              className={`${fraudulentTransactions.includes(_id) ? "table-warning" : amount >= 0 ? "table-success" : "table-danger"}`}
            >
              <td className={styles.empty}>
                <input
                  type="checkbox"
                  checked={fraudulentTransactions.includes(_id)}
                  onChange={() => handleCheckbox(_id)}
                />
              </td>
              <td>{amount.toFixed(2)}</td>
              <td>{description}</td>
              <td>{format(createdAt, "yyyy-MM-dd HH:mm")}</td>
              <td>{type}</td>
              <td className={styles.empty}>
                <button 
                  type="button" 
                  className={styles.delete_btn} 
                  onClick={() =>{ 
                    handleDelete(_id)
                    router.refresh()
                  }} 
                /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
