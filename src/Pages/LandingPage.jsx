import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../utils/useUser";  // Import the custom hook

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();  // Use the custom hook to fetch user data

  // Redirect to login if no user is found or there's an error
  if (error) {
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5e8c7] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleGoToDashboard = () => {
    // Navigate to the Dashboard page
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5e8c7] flex flex-col items-center justify-center">
      {user ? (
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#363062]">Welcome, {user.username}!</h1>
          <p className="text-lg text-[#818fb4] mt-4">We're glad to have you here!</p>
          
          <button
            onClick={handleGoToDashboard}
            className="mt-6 px-6 py-2 bg-[#363062] text-white rounded-lg shadow-md hover:bg-[#272249]"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <p>Unable to load user data.</p>
      )}
    </div>
  );
};

export default LandingPage;
