import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import styles from "./WalletCard.module.css";
import React, { ReactNode } from "react";
import RecentTransactions from "../RecentTransactions/RecentTransactions";

type WalletCardProps = {
  wallet: Wallet;
  children?: ReactNode;
  transactions: Transaction[];
  classname?: string;
};

const WalletCard = ({ wallet: { name, balance, _id: wallet_id }, transactions }: WalletCardProps) => {
  return (
    <Card key={wallet_id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Balance: {balance}</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentTransactions title="Recent transactions: " wallet_id={wallet_id} transactions={transactions} />
      </CardContent>
    </Card>
  );
};

export default WalletCard;

 // <div key={wallet_id} className={styles.wrapper}>
    //   <h1 className={styles.name}>{name}</h1>
    //   <span className={styles.balance}>Balance: {balance}</span>
    //     <div className={styles.transaction_wrapper}>
    //       Recent transactions:
    //       {transactions && transactions
    //         .filter((transaction:Transaction)=> transaction.wallet._id === wallet_id)
    //         .map((transaction:Transaction) =>
    //           <div key={transaction._id} className={styles.transaction}>
    //             <p>{transaction.amount} </p>
    //             <p>{transaction.description} </p>
    //           </div>
    //           )}
    //     </div>
    // </div>
