import React, { useState } from 'react';

const ExpenseForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');  // New state for "Other" category
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    // If "Other" category is selected, use the custom input
    const selectedCategory = category === 'Other' ? otherCategory : category;

    // Add a new expense transaction
    addTransaction({
      type: 'expense',
      amount: parseFloat(amount),
      category: selectedCategory,
      date,
      currency: '₱',
    });

    // Reset the form
    setAmount('');
    setCategory('');
    setOtherCategory('');  // Reset the "Other" category input
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-transparent ml-16 flex flex-col -mt-40">
      <h3 className="font-semibold text-sm mb-4 font-hagrid">Add Expense</h3>

      {/* Amount Field */}
      <label htmlFor="amount" className='font-hagrid text-xs p-1 font-semibold'>Expense Amount</label>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 pr-[80px] text-[#f5f4e6] border"
      />

      {/* Category Select Field */}
      <label htmlFor="category" className='font-hagrid text-xs p-1 font-semibold'>Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          if (e.target.value !== 'Other') {
            setOtherCategory('');  // Reset "Other" category input if not selected
          }
        }}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
      >
        <option value="" disabled>Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
        <option value="School">School</option>
        <option value="Other">Other</option>
      </select>

      {/* Custom Category Input when "Other" is selected */}
      {category === 'Other' && (
        <>
          <label htmlFor="otherCategory" className='font-hagrid text-xs p-1 font-semibold'>Enter Custom Category</label>
          <input
            type="text"
            id="otherCategory"
            placeholder="Custom Category"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
          />
        </>
      )}

      {/* Date Field */}
      <label htmlFor="date" className='font-hagrid text-xs p-1 font-semibold'>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-[#363062] font-poppins rounded-xl pl-2 text-base py-1 mb-2 text-[#f5f4e6] border"
      />

      {/* Submit Button */}
      <button type="submit" className="bg-[#818fb4] shadow-xl text-white -p-12  -m-px-2 mt-2 py-2 rounded-2xl font-sans text-base border border-black hover:bg-[#8799c8]">
        ADD EXPENSE
      </button>
    </form>
  );
};

export default ExpenseForm;
