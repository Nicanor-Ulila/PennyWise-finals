import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../utils/TransactionContext"; // Import the context hook
import DbHeader from "../Components/DbHeader";
import ReminderCard from "../Components/ReminderCard";
import GoalsCard from "../Components/GoalsCard";
import WeeklySummary from "../Components/WeeklySummary";
import DailySummary from "../Components/DailySummary"; // Import DailySummary
import Sidebar from "../Components/Sidebar"; // Import Sidebar component

function Dashboard() {
  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useTransactions(); // Use the transactions from context

  // Default start and end date for the week
  const [startDate, setStartDate] = useState("2024-12-08");
  const [endDate, setEndDate] = useState("2024-12-14");

  // State for selected day and month for summaries
  const [selectedDay, setSelectedDay] = useState("2024-12-10"); // Default date for daily summary
  
  // Calculate the balance here
  const activeTransactions = transactions.filter((tx) => !tx.removed);
  const totalIncome = activeTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
  const totalExpenses = activeTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
  const totalSavings = activeTransactions
    .filter((tx) => tx.type === "Savings")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const balance = totalIncome - (totalExpenses + totalSavings);
  
  // Log transactions to see if they are coming through correctly
  useEffect(() => {
    console.log("Transactions loaded:", transactions); // Log transactions when the component mounts or updates
  }, [transactions]);

  return (
    <div className="flex h-screen bg-[#f5e8c7]">
      <Sidebar /> {/* Include Sidebar for navigation */}

      <div className="flex flex-col flex-grow pt-6">
        <DbHeader username="User" />

        <div className="flex mt-6 space-x-4"> {/* Change space-y-8 to space-x-4 for horizontal space */}
          <ReminderCard />
          <div className="flex  mt-6 ml-64">
            {/* Weekly, Daily, and Monthly Summaries */}
            <WeeklySummary 
              transactions={transactions} 
              startDate={startDate} 
              endDate={endDate} 
              setStartDate={setStartDate} // Pass setter for start date
              setEndDate={setEndDate} // Pass setter for end date
            />
          </div>
        </div>

        {/* Goals Card without extra space */}
        <div className="flex mt-4 space-x-6">
          {/* Goals card and Daily Summary should be close together */}
          <GoalsCard />
          <div className="flex-grow">
            {/* Daily Summary with adjustable date */}
            <DailySummary 
              transactions={transactions} 
              selectedDay={selectedDay}  // Pass selected day for Daily Summary
              setSelectedDay={setSelectedDay}  // Setter for updating the day
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
