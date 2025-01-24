import React, { useState } from 'react';

const IncomeForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    // Add a new income transaction
    addTransaction({
      type: 'income',
      amount: parseFloat(amount),
      category,
      date,
      currency: '₱',
    });

    // Reset the form
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-transparent ml-16 flex flex-col">
      <p className="font-semibold text-sm mb-4 font-hagrid">Add Income</p>
      <label htmlFor="amount" className='font-hagrid text-xs p-1 font-semibold text-[]'>Income Amount</label>
      <input
        type="number"
        placeholder='Enter Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
      />
      <label htmlFor="category" className='font-hagrid text-xs p-1 font-semibold'>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
      >
        <option value="" disabled>Select Category</option>
        <option value="Freelance">Freelance</option>
        <option value="Salary">Salary</option>
        <option value="Investment">Investment</option>
        <option value="Bonus">Bonus</option>
        <option value="Allowance">Allowance-Palamunin sa Bahay</option>
        <option value="Other">Other</option>
      </select>
      <label htmlFor="date" className='font-hagrid text-xs p-1 font-semibold'>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
      />
      <button type="submit" className="bg-[#818fb4] shadow-xl text-white -p-12 -m-px-2 mt-2 py-2 rounded-2xl font-sans text-base border border-black hover:bg-[#8799c8]">
        ADD INCOME
      </button>
    </form>
  );
};

export default IncomeForm;