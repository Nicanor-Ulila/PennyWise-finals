import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo1 from './../assets/images/logo1.png';
import axios from 'axios';

function ForgotCard() {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address.';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://127.0.0.1:5555/forgot-password',
          formData,
          { withCredentials: true }
        );
  
        console.log('Password reset request successful:', response.data);
  
        // Store user data in sessionStorage
        sessionStorage.setItem('username', formData.username);
        sessionStorage.setItem('email', formData.email);
  
        // Redirect to NewPass page
        navigate('/newpass');
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
            Forgot Password
          </h2>
        </div>
        <p className="text-center text-sm font-extrabold text-[#818fb4] mb-0 mt-3 font-poppins mx-20">
          Enter your username and email to reset your password
        </p>
        <form
          className="p-14 pt-6 mx-6 text-lg font-medium text-[#818fb4]"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 font-inter flex flex-col space-y-4 max-w-sm m-auto">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-[#363062] focus:outline-none text-gray-900 py-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-[#363062] focus:outline-none text-gray-900 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mb-0 mt-2 py-3 bg-[#363062] text-[#f5f4e6] font-inter font-bold rounded-3xl hover:outline focus:ring-1"
          >
            Reset Password
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

export default ForgotCard;
