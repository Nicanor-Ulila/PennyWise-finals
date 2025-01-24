import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Helper function to filter transactions within a given day and remove "removed" transactions
const filterTransactionsByDay = (transactions, selectedDay) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (isNaN(transactionDate)) {
      console.warn("Invalid transaction date:", transaction.date);
      return false;
    }
    const selectedDate = new Date(selectedDay);
    return (
      transactionDate.toDateString() === selectedDate.toDateString() &&
      !transaction.removed // Ensure removed transactions are excluded
    );
  });
};

const DailySummary = ({ transactions, selectedDay, setSelectedDay }) => {
  const dailyTransactions = filterTransactionsByDay(transactions, selectedDay);

  // Ensure parsing is done correctly and summing the amounts
  const dailyIncome = dailyTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const dailyExpenses = dailyTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const dailySavings = dailyTransactions
    .filter((transaction) => transaction.type === "Savings")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  // Round amounts to 2 decimal places to avoid precision issues
  const roundedDailyIncome = dailyIncome.toFixed(2);
  const roundedDailyExpenses = dailyExpenses.toFixed(2);
  const roundedDailySavings = dailySavings.toFixed(2);

  const data = [
    { name: "Income", value: parseFloat(roundedDailyIncome) },
    { name: "Expenses", value: Math.abs(parseFloat(roundedDailyExpenses)) },
    { name: "Savings", value: Math.abs(parseFloat(roundedDailySavings)) }, // Added Savings to the data
  ];

  return (
    <div
      className="p-4 border border-[#435585] rounded-xl w-[450px] flex flex-col text-xs ml-[180px] mt-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      style={{
        fontSize: "12px",
        background: "linear-gradient(135deg, #f5e8c7, #e0e5f0)", // Gradient background
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto", // Adjusting the height to cover content dynamically
      }}
    >
      <h3 className="text-lg font-semibold mb-4 text-[#435585]">Daily Summary</h3>

      {/* Date Picker for selecting a day */}
      <div className="mb-2">
        <label className="text-xs font-medium">Select: </label>
        <input
          type="date"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
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
          <h4 className="text-xs font-medium">Income: ₱{roundedDailyIncome}</h4>
        </div>
        <div className="mb-2">
          <h4 className="text-xs font-medium">Expenses: ₱{Math.abs(roundedDailyExpenses)}</h4>
        </div>
        <div className="mb-2">
          <h4 className="text-xs font-medium">Savings: ₱{Math.abs(roundedDailySavings)}</h4>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
