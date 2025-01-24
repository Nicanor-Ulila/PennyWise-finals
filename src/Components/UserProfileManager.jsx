import React, { useState, useEffect } from 'react';

const UserProfileManager = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    birthdate: '',
    about_me: ''
  });

  // Generate a random profile picture URL
  const getRandomAvatar = () => {
    // Check if there's a saved avatar in sessionStorage
    const savedAvatar = sessionStorage.getItem('avatar');
    if (savedAvatar) {
      return savedAvatar; // Return the saved avatar if it exists
    } else {
      // If no avatar saved, generate a new one and save it in sessionStorage
      const newAvatar = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
      sessionStorage.setItem('avatar', newAvatar); // Save the avatar in sessionStorage
      return newAvatar;
    }
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
  };

  return (
    <div className="bg-[#f5e8c7] rounded-lg p-6 m-2 mr-20 shadow-xl max-w-3xl mx-auto transition-all duration-300 hover:scale-105">
      {/* Avatar */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-28 h-28 bg-gradient-to-r from-[#435585] to-[#818fb4] rounded-full flex items-center justify-center shadow-xl transform transition duration-300 hover:scale-110">
          <img
            src={getRandomAvatar()}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Conditional Rendering */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative group">
            <label className="block text-sm text-[#435585] mb-1">USERNAME</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full bg-[#435585] text-[#f5f4e6] rounded-lg p-3 cursor-not-allowed transition-all duration-300 ease-in-out group-hover:bg-[#5f6c8e]"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="block text-sm text-[#435585] mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-[#435585] text-[#f5f4e6] rounded-lg p-3 cursor-not-allowed transition-all duration-300 ease-in-out group-hover:bg-[#5f6c8e]"
            />
          </div>

          {/* Birthdate */}
          <div className="relative group">
            <label className="block text-sm text-[#435585] mb-1">BIRTHDATE</label>
            <input
              type="date"
              name="birthdate"
              value={profileData.birthdate}
              onChange={handleChange}
              className="w-full bg-[#818fb4] text-[#f5f4e6] rounded-lg p-3 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 group-hover:bg-[#5f6c8e]"
            />
          </div>

          {/* About Me */}
          <div className="relative group">
            <label className="block text-sm text-[#435585] mb-1">ABOUT ME</label>
            <textarea
              name="about_me"
              value={profileData.about_me}
              onChange={handleChange}
              className="w-full bg-[#818fb4] text-[#f5f4e6] rounded-lg p-3 h-28 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 group-hover:bg-[#5f6c8e]"
              placeholder="Tell something about yourself..."
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#435585] text-[#f5f4e6] py-2 rounded-lg hover:bg-[#5f6c8e] transition duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Username */}
          <div className="bg-[#435585] text-[#f5f4e6] rounded-lg p-3 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#5f6c8e]">
            <p className="font-bold">USERNAME</p>
            <p>{user.username}</p>
          </div>

          {/* Email */}
          <div className="bg-[#435585] text-[#f5f4e6] rounded-lg p-3 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#5f6c8e]">
            <p className="font-bold">EMAIL ADDRESS</p>
            <p>{user.email}</p>
          </div>

          {/* Birthdate */}
          <div className="bg-[#435585] text-[#f5f4e6] rounded-lg p-3 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#5f6c8e]">
            <p className="font-bold">BIRTHDATE</p>
            <p>{profileData.birthdate || 'N/A'}</p>
          </div>

          {/* About Me */}
          <div className="bg-[#818fb4] text-[#f5f4e6] rounded-lg p-3 h-28 shadow-xl transition-all duration-300 ease-in-out hover:bg-[#5f6c8e]">
            <p className="font-bold">ABOUT ME</p>
            <p>{profileData.about_me || 'Tell something about yourself...'}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-[#f5f4e6] text-[#435585] py-2 rounded-lg hover:bg-[#e1e1e1] transition duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileManager;
