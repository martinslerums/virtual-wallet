"use client"

import React, { ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type FraudulentTransactionsProvider = {
  children: React.ReactNode
}

type FraudulentTransactionContext = {
  fraudulentTransactions: string [];
  setFraudulentTransactions: React.Dispatch<SetStateAction<string[]>>
}

export const FraudulentTransactionsContext = createContext<FraudulentTransactionContext | null>(null);

export const FraudulentTransactionsProvider = ({ children }: FraudulentTransactionsProvider) => {
  const [fraudulentTransactions, setFraudulentTransactions] = useState([]);

  return (
    <FraudulentTransactionsContext.Provider value={{ fraudulentTransactions, setFraudulentTransactions }}>
      {children}
    </FraudulentTransactionsContext.Provider>
  );
};

export const useFraudulentTransactionsContext = () => {
  const context = useContext(FraudulentTransactionsContext);

  if (!context) {
    throw new Error("useFraudulentTransactionsContext must be used within a FraudulentTransactionsProvider")
  }

  return context
}