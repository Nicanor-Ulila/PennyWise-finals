import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DbHeader from "../Components/DbHeader";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SavingsForm from "../Components/SavingsForm";
import { v4 as uuidv4 } from "uuid";


const PennySave = () => {
  const [transactions, setTransactions] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);

  // Load transactions and savings goals from sessionStorage on component mount
  useEffect(() => {
    const storedTransactions = sessionStorage.getItem("transactions");
    const storedGoals = sessionStorage.getItem("savingsGoals");

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }

    if (storedGoals) {
      setSavingsGoals(JSON.parse(storedGoals));
    }
  }, []);

  // Save transactions and savings goals to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("transactions", JSON.stringify(transactions));
    sessionStorage.setItem("savingsGoals", JSON.stringify(savingsGoals));
  }, [transactions, savingsGoals]);

  // Add a new savings goal
  const handleAddGoal = (newGoal) => {
    const savingsGoal = {
      ...newGoal,
      id: uuidv4(),
      type: "Savings",
      saved: 0,
      
    };
    setSavingsGoals((prev) => [...prev, savingsGoal]);
  };

  // Add contribution to a savings goal
  const handleAddContribution = (goalId) => {
    setSavingsGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId) {
          const contributionAmount = parseFloat(goal.contribution || 0);

          if (!goal.contribution || !goal.contributionDate) {
            alert("Please enter a valid contribution amount and date.");
            return goal;
          }

          if (contributionAmount <= 0) {
            alert("Contribution amount must be greater than zero.");
            return goal;
          }

          if (goal.saved + contributionAmount > goal.amount) {
            alert("Contribution exceeds the remaining goal amount.");
            return goal;
          }

          // Add the contribution as a new transaction
          const newContribution = {
            id: uuidv4(),
            type: "Savings",
            category: goal.name,
            amount: contributionAmount, // Store as a number
            date: goal.contributionDate,
            currency: '₱',
          };
          

          setTransactions((prev) => [...prev, newContribution]);

          // Update the saved amount in the original goal
          return {
            ...goal,
            saved: goal.saved + contributionAmount,
            contribution: "",
            contributionDate: "",
            currency: '₱',
          };
        }
        return goal;
      })
    );
  };

  const handleInputChange = (goalId, field, value) => {
    setSavingsGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? { ...goal, [field]: value }
          : goal
      )
    );
  };

  const handleDeleteGoal = (goalId) => {
    setSavingsGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== goalId)
    );
  };

  return (
    <div className="flex w-full h-screen bg-[#f5e8c7]">
      <Sidebar />

      <div className="flex flex-col flex-grow pt-6">
        <DbHeader />

        <div className="p-6 space-y-6 max-w-4xl w-100 justify-center content-center ml-20 mt-6 mb-12">
          {/* Savings Form */}
          <SavingsForm addTransaction={handleAddGoal} />

          {/* Savings List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {savingsGoals.map((goal) => {
              const progressPercentage = (goal.saved / goal.amount) * 100;

              return (
                <div
                  key={goal.id}
                  className="flex flex-col bg-[#f5f4e6] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-md font-bold text-center">
                      {goal.name}
                    </h2>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <CircularProgressbar
                    value={progressPercentage}
                    text={`${Math.round(progressPercentage)}%`}
                    styles={buildStyles({
                      textColor: "#333",
                      pathColor: "#4caf50",
                      trailColor: "#d6d6d6",
                    })}
                    className="w-[150px] h-[150px] mb-3"
                  />
                  <p className="mt-1 text-center text-sm">
                    Saved: ₱ {goal.saved.toLocaleString()} / ₱ {goal.amount.toLocaleString()}
                  </p>


                  {/* Contribution Section */}
                  <div className="mt-3 w-full">
                    <input
                      type="number"
                      placeholder="Contribution Amount (e.g., 1000)"
                      value={goal.contribution || ""}
                      onChange={(e) =>
                        handleInputChange(goal.id, "contribution", e.target.value)
                      }
                      className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="date"
                      value={goal.contributionDate || ""}
                      onChange={(e) =>
                        handleInputChange(goal.id, "contributionDate", e.target.value)
                      }
                      className="w-full mb-2 px-3 py-1 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => handleAddContribution(goal.id)}
                      className="w-full bg-green-500 text-white py-1 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Add Contribution
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PennySave;
