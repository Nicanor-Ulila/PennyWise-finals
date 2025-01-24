import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import DbHeader from '../Components/DbHeader';
import GoalsCard from '../Components/GoalsCard'; // Import the GoalsCard component
import useUser from '../utils/useUser'; // Import the useUser hook

function Goals() {
  // Using the useUser hook to get user data
  const { user, isLoading, error } = useUser();

  // State for goals list and new goal text
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching user data:", error);
    }
  }, [error]);

  // Load goals from sessionStorage on component mount
  useEffect(() => {
    const savedGoals = sessionStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals)); // Load the saved goals from sessionStorage
    }
  }, []);

  // Update sessionStorage whenever goals change
  useEffect(() => {
    if (goals.length > 0) {
      sessionStorage.setItem('goals', JSON.stringify(goals));
    }
  }, [goals]);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const newGoalObj = { id: Date.now(), text: newGoal, done: false };
      const updatedGoals = [...goals, newGoalObj];
      setGoals(updatedGoals); // Add new goal to the list
      setNewGoal(""); // Clear the input field after adding the goal
    }
  };

  const handleToggleGoal = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(updatedGoals); // Toggle the goal status
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals); // Remove the goal from the list
  };

  const handleEditGoal = (id, newText) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, text: newText } : goal
    );
    setGoals(updatedGoals); // Edit the goal text
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter unfinished goals and take the first 3
  const unfinishedGoals = goals.filter((goal) => !goal.done).slice(0, 3);

  return (
    <div className="flex w-full h-screen bg-[#f5e8c7]">
      <Sidebar />

      <div className="flex flex-col flex-grow pt-6">
        <DbHeader />

        <div className="p-6 space-y-6 max-w-4xl w-100 justify-center content-center ml-20 mt-6 mb-12">
          {/* Goal Input */}
          <div className="flex justify-center ml-64">
            <div className="flex items-center space-x-4 bg-gradient-to-r from-[#435585] to-[#5b7ab5] p-4 rounded-lg shadow-xl w-full max-w-2xl relative transform hover:scale-105 transition-all duration-300 ease-in-out">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 bg-[#818fb4] text-[#f5f4e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-[#f5f4e6] transition-all duration-300 ease-in-out"
                placeholder="Add a new goal"
              />
              <button
                onClick={handleAddGoal}
                className="px-4 py-2 bg-[#f5f4e6] text-[#435585] rounded-lg hover:bg-[#e1e1e1] transition duration-300 ease-in-out"
              >
                Add Goal
              </button>
            </div>
          </div>

          {/* Goal List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex flex-col bg-[#f5f4e6] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl h-auto"
              >
                {/* Goal Title and Remove Button */}
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => handleToggleGoal(goal.id)}
                    className="h-5 w-5 text-[#435585] rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => handleEditGoal(goal.id, e.target.value)}
                    className={`flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${goal.done ? 'bg-gray-300 line-through' : ''}`}
                    disabled={goal.done}
                  />
                  {/* Remove Button */}
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="ml-4 text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
       
      </div>
    </div>
  );
}

export default Goals;
