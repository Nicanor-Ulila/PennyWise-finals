import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import DbHeader from '../Components/DbHeader';
import useUser from '../utils/useUser'; // Assuming the hook is located here
import HttpClient from '../utils/HttpClient'; // Import HttpClient

function History() {
  const { user, isLoading, error } = useUser();

  const [transactions, setTransactions] = useState([]); // Active transactions
  const [removedTransactions, setRemovedTransactions] = useState([]); // Removed transactions

  useEffect(() => {
    if (error) {
      console.error("Error fetching user:", error);
    }
  }, [error]);

  useEffect(() => {
    const storedTransactions = sessionStorage.getItem("transactions");
    if (storedTransactions) {
      const data = JSON.parse(storedTransactions);
      const activeTxs = data.filter(tx => !tx.removed);  
      const removedTxs = data.filter(tx => tx.removed);  
      setTransactions(activeTxs);
      setRemovedTransactions(removedTxs);
    }
  }, []);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSendDataToServer = async () => {
    // Combine active and removed transactions
    const allTransactions = [...transactions, ...removedTransactions];
  
    const dataToSend = {
      transactions: allTransactions,
    };
  
    try {
      // Send the transaction data to the backend
      const response = await HttpClient.post('/generate-cobol-file', dataToSend, {
        responseType: 'blob', 
      });
  
      // Trigger download
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'transaction_report.txt'); 
      document.body.appendChild(link);
      link.click();  
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#f5e8c7]">
      <div>
        <Sidebar />
      </div>

      <div className="flex flex-col flex-grow pt-6 justify-center items-center">
        <div>
          <DbHeader />
        </div>

        {/* Centered Box */}
        <div className="p-6 mt-12 bg-white border border-[#435585] rounded-lg shadow-lg  w-[800px] mb-[200px] mr-72">
          <h2 className="font-semibold text-2xl mb-4 text-[#435585] text-center">Transaction History</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-xl text-[#435585]">Added Transactions</h3>
            <div>
              {transactions.map((tx, index) => (
                <div key={index} className="mb-3 p-4 border-b border-gray-300 rounded-lg hover:bg-[#e0e5f0]">
                  <p className="text-sm text-[#2C3E50]">
                    {tx.type === 'income' ? 'Income' : tx.type === 'expense' ? 'Expense' : 'Savings'}:
                    {tx.category} - ₱ {Number(tx.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-[#e74c3c]">Deleted Transactions</h3>
            <div>
              {removedTransactions.map((tx, index) => (
                <div key={index} className="mb-3 p-4 border-b border-gray-300 rounded-lg hover:bg-[#f5e8c7]">
                  <p className="text-sm text-[#e74c3c]">
                    {tx.type === 'income' ? 'Income' : tx.type === 'expense' ? 'Expense' : 'Savings'}:
                    {tx.category} - ₱ {Number(tx.amount).toLocaleString()} (This entry was removed)
                  </p>
                </div>
              ))}
            </div>
          </div>
                  {/* Centered Button */}
        <div className="p-6 mt-4 flex justify-center">
          <button 
            onClick={handleSendDataToServer} 
            className="bg-[#435585] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#2C3E50] transition duration-300">
            Send Data to Server
          </button>
        </div>
        </div>


      </div>
    </div>
  );
}

export default History;
