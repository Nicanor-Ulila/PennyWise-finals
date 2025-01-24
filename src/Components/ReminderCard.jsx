import React, { useState, useEffect } from "react";

// Reusable Card Component
const Card = ({ title, children, className }) => (
  <div className={`bg-[#435585] text-white w-[700px] h-[300px] px-4 pt-2 rounded-xl shadow-xl mt-10 ml-10 ${className}`}>
    {title && (
      <h2 className="text-2xl text-[#f5f4e6] font-hagrid font-semibold p-4">
        {title}
      </h2>
    )}
    <div className="p-4">{children}</div>
  </div>
);

// Main ReminderCard Component
const ReminderCard = () => {
  const [balance, setBalance] = useState(null);
  const [savingsGoals, setSavingsGoals] = useState([]);

  useEffect(() => {
    // Retrieve remaining balance from sessionStorage
    const storedBalance = sessionStorage.getItem("remainingBalance");
    if (storedBalance !== null) {
      setBalance(Number(storedBalance));
    }

    // Retrieve savings goals from sessionStorage
    const storedGoals = sessionStorage.getItem("savingsGoals");
    if (storedGoals) {
      setSavingsGoals(JSON.parse(storedGoals));
    }
  }, []);

  return (
    <Card title="Reminder">
      <p className="pb-5 text-md font-semibold font-poppins text-[#f5f4e6]">
        {/* Display remaining balance */}
        {balance !== null ? (
          <>
            You have a current balance of{" "}
            <span className="text-green-400">
              ₱ {Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>.
          </>
        ) : (
          "Calculating your balance..."
        )}
      </p>

      {/* Display savings goals */}
      {savingsGoals.length > 0 ? (
        <>
          <p className="text-md font-semibold font-poppins text-[#f5f4e6]">
            Regularly monitor your following Savings Goal/s:
          </p>
          <ul className="mt-2">
            {savingsGoals.map((goal, index) => (
              <li key={index} className="text-md font-semibold font-poppins text-green-400">
                {goal.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-md font-semibold font-poppins text-[#f5f4e6]">
          Currently, you don't have any Savings Goal.
        </p>
      )}
    </Card>
  );
};

export default ReminderCard;
