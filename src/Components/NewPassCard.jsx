import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo1 from './../assets/images/logo1.png';
import axios from 'axios';

function NewPassCard() {
  // State to manage form data
  const [formData, setFormData] = useState({
    newPassword: '',
  });

  // State to manage errors
  const [errors, setErrors] = useState({});

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required.';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long.';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const username = sessionStorage.getItem('username'); // Retrieve from sessionStorage
  
      if (!username) {
        alert('User not authenticated. Please try again.');
        navigate('/login'); // Redirect if no user info is found in sessionStorage
        return;
      }
  
      try {
        const response = await axios.post(
          'http://127.0.0.1:5555/reset-password',
          { username, newPassword: formData.newPassword }, // Send username and newPassword
          { withCredentials: true }
        );
  
        console.log('Password reset successful:', response.data);
  
        alert('Password reset successful! Redirecting to login...');
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.data) {
          const apiError = error.response.data.error || 'Password reset failed.';
          alert(apiError);
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    }
  };
  

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-3xl shadow-lg pt-6 pb-8 w-full max-w-md">
        <div className="flex justify-center mt-0">
          <img src={logo1} className="w-[90px]" alt="Logo" />
        </div>
        <div className="max-w-full">
          <h2
            className="text-4xl font-black text-center mb-0 font-poppins"
            style={{ color: '#363062' }}
          >
            Reset Password
          </h2>
        </div>
        <p className="text-center text-sm font-extrabold text-[#818fb4] mb-0 mt-3 font-poppins mx-20">
          Enter your new password below
        </p>
        <form
          className="p-14 pt-6 mx-6 text-lg font-medium text-[#818fb4]"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 font-inter flex flex-col space-y-4 max-w-sm m-auto">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border-b border-[#363062] focus:outline-none text-gray-900 py-2"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mb-0 mt-2 py-3 bg-[#363062] text-[#f5f4e6] font-inter font-bold rounded-3xl hover:outline focus:ring-1"
          >
            Update Password
          </button>
        </form>
        <p className="text-center font-poppins font-bold text-[#818fb4] -mt-6">
          Remembered your password?{' '}
          <a href="/login" className="text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default NewPassCard;
