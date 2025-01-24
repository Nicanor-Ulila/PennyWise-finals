import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import DbHeader from "../Components/DbHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:5555/delete-account", { withCredentials: true });
      setSuccessMessage(response.data.message);
      
      // Redirect user to login page after successful account deletion
      setTimeout(() => {
        navigate("/login");
      }, 2000);  // Wait for 2 seconds before redirecting
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full h-screen bg-[#f5e8c7]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="pt-6">
          <DbHeader />
        </div>

        {/* Settings Content */}
        <div className="flex justify-center items-center p-6">
          <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-xl w-full text-center space-y-6 transform transition duration-300 hover:scale-105 mr-20">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
              Account Deletion
            </h1>

            {/* Display error message */}
            {error && <p className="text-red-600 text-lg mt-4">{error}</p>}

            {/* Display success message */}
            {successMessage && <p className="text-green-600 text-lg mt-4">{successMessage}</p>}

            <p className="text-lg text-gray-700 font-medium">
              Do you wish to delete your account? This action cannot be undone.
            </p>
            <p className="text-lg text-gray-600 font-light mt-4">
              <span className="font-semibold text-gray-800">Rest assured,</span> your personal information is handled securely and in compliance with our privacy policy.
            </p>
            <p className="text-lg text-gray-600 font-light mt-4">
              If you're certain, click below to proceed with the account deletion process.
            </p>

            <button
              onClick={openModal}
              className="mt-8 px-8 py-3 bg-red-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
            >
              Yes, Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-10">
          <div className="bg-white p-12 rounded-lg shadow-lg w-96 text-center space-y-6 transform transition duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Are you sure?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Once you delete your account, it cannot be recovered. Please confirm if you're absolutely sure you want to proceed.
            </p>
            <div className="flex justify-center gap-8">
              <button
                onClick={handleDeleteAccount}
                className="px-8 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={closeModal}
                className="px-8 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
