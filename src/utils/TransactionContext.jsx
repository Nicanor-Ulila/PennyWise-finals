import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const TransactionContext = createContext();

// Create a provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from sessionStorage if available
  useEffect(() => {
    const storedTransactions = sessionStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // Update transactions
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => {
      const newTransactions = [...prevTransactions, transaction];
      sessionStorage.setItem("transactions", JSON.stringify(newTransactions));
      return newTransactions;
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) => {
      const filteredTransactions = prevTransactions.filter((tx) => tx.id !== id);
      sessionStorage.setItem("transactions", JSON.stringify(filteredTransactions));
      return filteredTransactions;
    });
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the context
export const useTransactions = () => useContext(TransactionContext);
