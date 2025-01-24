import React, { useEffect } from 'react';
import { MdRemove } from "react-icons/md";

const TransactionList = ({ transactions, deleteTransaction }) => {
  // Group transactions by date, including deleted transactions
  const groupedTransactions = transactions.reduce((acc, tx) => {
    if (!acc[tx.date]) {
      acc[tx.date] = [];
    }
    acc[tx.date].push(tx);
    return acc;
  }, {});

  // Remove date groups that have no non-removed transactions
  Object.keys(groupedTransactions).forEach(date => {
    groupedTransactions[date] = groupedTransactions[date].filter(tx => !tx.removed);
    if (groupedTransactions[date].length === 0) {
      delete groupedTransactions[date];
    }
  });

  // Sort the dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));

  // Save transactions to sessionStorage whenever transactions change
  useEffect(() => {
    sessionStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div>
      <h1 className="font-bold font-hagrid text-[23px] border rounded-2xl bg-[#818fb4] border-black p-4 mb-4 ml-[180px] text-[#f5f4e6]">Income, Expense and Savings Tracking</h1>
      <div className="w-[720px] h-[360px] ml-[180px] border border-[#1d1f25] rounded-2xl p-4 mt-6 font-poppins text-base bg-[#435585] text-[#f5f4e6]">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="font-semibold text-sm mb-2">{date}</h3>
            <div className="grid grid-cols-2 gap-4">
              {groupedTransactions[date].map((tx) => (
                <div key={tx.id} className={`mb-2 flex justify-between items-center ${tx.type === 'expense' ? 'pl-4' : ''}`}>
                  <div>
                    <p>
                      <strong className="mr-12">
                        {tx.type === 'income' ? 'Income' : tx.type === 'expense' ? 'Expense' : 'Savings'}:
                      </strong> {tx.category} - ₱ {Number(tx.amount).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="bg-[#818fb4] text-white p-1 rounded"
                  >
                    <MdRemove />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
