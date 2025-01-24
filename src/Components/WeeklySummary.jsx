import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Helper function to filter transactions within a given date range and exclude removed ones
const filterTransactionsByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter((transaction) => {
    if (transaction.removed) return false;

    const transactionDate = new Date(transaction.date);
    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
  });
};

const WeeklySummary = ({ transactions, startDate, endDate, setStartDate, setEndDate }) => {
  const weeklyTransactions = filterTransactionsByDateRange(transactions, startDate, endDate);

  const weeklyIncome = weeklyTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const weeklyExpenses = weeklyTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const weeklySavings = weeklyTransactions
    .filter((transaction) => transaction.type === "Savings")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const data = [
    { name: "Income", value: weeklyIncome },
    { name: "Expenses", value: Math.abs(weeklyExpenses) },
    { name: "Savings", value: Math.abs(weeklySavings) },
  ];

  return (
    <div
      className="p-4 border border-[#435585] rounded-xl w-[450px] flex flex-col text-xs ml-[150px] mt-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 "
      style={{
        fontSize: "12px",
        background: "linear-gradient(135deg, #f5e8c7, #e0e5f0)", // Gradient background
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto", // Adjusting the height to cover content dynamically
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-[#435585]">Weekly Summary</h3>

      {/* Date Picker Inputs for Adjustable Date Range */}
      <div className="mb-2">
        <label className="text-xs font-medium">Start: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="text-xs ml-1 h-6 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435585]"
        />
      </div>
      <div className="mb-2">
        <label className="text-xs font-medium">End: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="text-xs ml-1 h-6 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435585]"
        />
      </div>

      {/* Pie Chart for Income, Expenses, and Savings */}
      <div className="mb-4 flex-grow flex justify-center items-center">
        <ResponsiveContainer width="80%" height={80}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={30}
              innerRadius={20}
              paddingAngle={5}
            >
              <Cell fill="#435585" />
              <Cell fill="#2C3E50" /> {/* Darker color for expenses */}
              <Cell fill="#27AE60" /> {/* New color for savings */}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Display Summary */}
      <div className="flex-grow flex flex-col justify-center items-center text-[#435585]">
        <div className="mb-2">
          <h4 className="text-xs font-medium">Income: ₱{weeklyIncome.toFixed(2)}</h4>
        </div>
        <div className="mb-2">
          <h4 className="text-xs font-medium">Expenses: ₱{Math.abs(weeklyExpenses).toFixed(2)}</h4>
        </div>
        <div className="mb-2">
          <h4 className="text-xs font-medium">Savings: ₱{Math.abs(weeklySavings).toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;
