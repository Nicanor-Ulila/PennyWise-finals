import React from 'react';

const ProfileCard = ({ user, profileData, onEditClick }) => {
  return (
    <div className="p-6 bg-transparent rounded-lg shadow-md">
      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <p><strong>Username:</strong> {user.username}</p>
      </div>

      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <p><strong>Birthdate:</strong> {profileData.birthdate}</p>
      </div>

      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <p><strong>About Me:</strong> {profileData.about_me}</p>
      </div>

      <button
        onClick={onEditClick}
        className="mt-4 bg-yellow-500 text-white p-2 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
