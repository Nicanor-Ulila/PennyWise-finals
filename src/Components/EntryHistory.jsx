import React, { useState } from 'react';
import TransactionList from '../Components/TransactionList';

const EntryHistory = ({ transactions, deleteTransaction }) => {
  // Filter out deleted transactions for a separate display
  const removedTransactions = transactions.filter(tx => tx.removed);

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-4">Transaction History</h1>
      
      {/* Active Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Transactions</h2>
        <TransactionList
          transactions={transactions.filter(tx => !tx.removed)}
          deleteTransaction={deleteTransaction}
        />
      </div>

      {/* Deleted Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-4 mt-6">Deleted Transactions</h2>
        <TransactionList
          transactions={removedTransactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default EntryHistory;
