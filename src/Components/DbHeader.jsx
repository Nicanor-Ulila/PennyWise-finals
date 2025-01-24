import React from "react";
import useUser from "../utils/useUser";  // Import the custom hook

const DbHeader = () => {
  const { user, loading, error } = useUser();  // Use the custom hook to get user data

  if (loading) {
    return (
      <div className="h-20vh w-screen bg-[#f5e8c7]">
        <p>Loading user info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-20vh w-screen bg-[#f5e8c7]">
        <p>Error loading user info. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="h-20vh w-screen bg-[#f5e8c7]">
      <div className="w-full p-0 pl-14 border-b-2 border-black pb-4">
        {user && (
          <>
            <h3 className="font-hagrid text-sm font-bold">Welcome Back, {user.username}</h3>
            <h1 className="font-hagrid text-3xl font-black pb-4">Track your budget now!</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default DbHeader;
