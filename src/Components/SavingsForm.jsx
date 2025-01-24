import React, { useState } from 'react';

const SavingsForm = ({ addTransaction }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalName || !goalAmount || goalAmount <= 0) {
      alert('Please enter a valid goal name and amount.');
      return;
    }

    addTransaction({
      id: Date.now(),
      name: goalName,
      amount: parseFloat(goalAmount),
      saved: 0,
      contribution: '',
      contributionDate: '',
      currency: '₱',
    });

    setGoalName('');
    setGoalAmount('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center"
    >
      <div className="flex items-center space-x-4 bg-gradient-to-r from-[#435585] to-[#5b7ab5] p-4 rounded-lg shadow-xl w-full max-w-2xl relative transform hover:scale-105 transition-all duration-300 ease-in-out">
        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 bg-[#818fb4] text-[#f5f4e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-[#f5f4e6] transition-all duration-300 ease-in-out"
          placeholder="Goal Name (e.g., iPhone)"
        />
        <input
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 bg-[#818fb4] text-[#f5f4e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-[#f5f4e6] transition-all duration-300 ease-in-out"
          placeholder="Goal Amount (e.g., 10000)"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#f5f4e6] text-[#435585] rounded-lg hover:bg-[#e1e1e1] transition duration-300 ease-in-out"
        >
          Add Goal
        </button>
      </div>
    </form>
  );
};

export default SavingsForm;
