import React from 'react';

const ProfileForm = ({ user, profileData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-[#f5e8c7] p-6 rounded-lg shadow-md">
      {/* Username - Unchangeable */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          type="text"
          name="username"
          value={user.username}
          disabled
        />
      </div>

      {/* Email - Unchangeable */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          type="email"
          name="email"
          value={user.email}
          disabled
        />
      </div>

      {/* Birthdate */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="birthdate">
          Birthdate
        </label>
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="birthdate"
          value={profileData.birthdate}
          onChange={onChange}
        />
      </div>

      {/* About Me */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="about_me">
          About Me
        </label>
        <textarea
          className="w-full p-2 border rounded"
          name="about_me"
          placeholder="Write about yourself"
          value={profileData.about_me}
          onChange={onChange}
        />
      </div>

      {/* Save Changes Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
