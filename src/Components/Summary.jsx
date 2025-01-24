import React, { useEffect } from 'react';

const Summary = ({ transactions = [] }) => {
  const activeTransactions = transactions.filter(tx => !tx.removed);

  const totalIncome = activeTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
  const totalExpenses = activeTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
  const totalSavings = activeTransactions
    .filter((tx) => tx.type === 'Savings')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = totalIncome - (totalExpenses + totalSavings);

  useEffect(() => {
    // Save the balance to sessionStorage whenever it changes
    sessionStorage.setItem('remainingBalance', balance);
  }, [balance]);

  const formatCurrency = (amount) =>
    `₱ ${Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="flex ml-[480px] mt-4">
      {/* Labels */}
      <div className="justify-between items-end p-4 text-xl bg-[#818fb4] rounded-2xl border border-black font-poppins text-[#f5f4e6] text-end">
        <div>Total Income</div>
        <div>Total Expenses</div>
        <div>Total Savings</div>
        <div className="pl-4">Remaining Balance</div>
      </div>

      {/* Values */}
      <div className="justify-between items-end p-4 text-xl bg-[#435585] rounded-2xl border border-black font-poppins text-[#f5f4e6] ml-4">
        <div className="pr-16">{formatCurrency(totalIncome)}</div>
        <div>{formatCurrency(totalExpenses)}</div>
        <div>{formatCurrency(totalSavings)}</div>
        <div
          className={`font-bold ${
            balance >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {formatCurrency(balance)}
        </div>
      </div>
    </div>
  );
};

export default Summary;
