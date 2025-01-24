import React, { useEffect, useState } from 'react';

// Reusable Card Component
const Card = ({ title, children, className }) => (
  <div className={`bg-[#435585] text-white max-w-lg max-h-full px-4 pt-2 rounded-xl shadow-xl ml-10 mt-10 w-[800px] ${className}`}>
    {title && (
      <h2 className="text-2xl text-[#f5f4e6] font-hagrid font-semibold p-4">
        {title}
      </h2>
    )}
    <div className="p-4">{children}</div>
  </div>
);

// Main GoalsCard Component
const GoalsCard = () => {
  const [goals, setGoals] = useState([]);
  
  // Load goals from sessionStorage on component mount
  useEffect(() => {
    const savedGoals = sessionStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals)); // Load the saved goals from sessionStorage
    }
  }, []);

  // Filter unfinished goals and get the first 3
  const unfinishedGoals = goals.filter((goal) => !goal.done).slice(0, 2);

  return (
    <Card title="Unfinished Goals">
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {unfinishedGoals.length === 0 ? (
          <p className="text-md font-semibold text-[#f5f4e6]">No unfinished goals yet!</p>
        ) : (
          unfinishedGoals.map((goal) => (
            <div key={goal.id} className="flex justify-between items-center bg-[#5b7ab5] text-white p-4 rounded-lg shadow-md">
              <p className="text-lg">{goal.text}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default GoalsCard;
