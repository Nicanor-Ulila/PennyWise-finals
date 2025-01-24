import React from 'react';
import Sidebar from '../Components/Sidebar';
import DbHeader from '../Components/DbHeader';
import useUser from '../utils/useUser'; // Keep the hook for logged-in user data
import UserProfileManager from '../Components/UserProfileManager'; // Import combined manager

const Profile = () => {
  const { user, loading, error } = useUser(); // Fetch user data using your hook

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5e8c7] flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5e8c7] flex justify-center items-center text-red-500">
        Error loading user data.
      </div>
    );
  }

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

        {/* Content Area */}
        <div className="p-6 flex justify-center mr-64">
          <div className="bg-[#fcf2d9] rounded-lg shadow-lg w-full max-w-2xl">
            {/* Pass the user data to UserProfileManager */}
            <UserProfileManager user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
