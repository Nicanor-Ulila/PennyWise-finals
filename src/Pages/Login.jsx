import React, { useState } from "react";
import logo5 from "../assets/images/logo5.png";
import HttpClient from "../utils/HttpClient"; // Adjust path based on your project structure

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await HttpClient.post("//localhost:5555/login", formData);

      // Handle successful login, e.g., store username in localStorage
      console.log("Login Successful:", response.data);

      // Store the username in localStorage (you can replace this with session storage or cookies)
      localStorage.setItem("username", response.data.username);

      // Redirect to the landing page
      window.location.href = "/landing";
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid username or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } else {
        setErrorMessage("Unable to connect to the server. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center fixed-inset-0 bg-[#435585] pl-14">
      <div className="w-full max-w-sm bg-transparent pl-20 mb-12">
        <h1 className="text-6xl font-black mb-6 font-poppins text-[#f5e8c7] text-center p-2">
          PennyWise
        </h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="mb-6 ml-0 p-4 text-lg pr-20 font-inter text-[#818fb4] border-2 border-[#f5e8c7] rounded-2xl outline-none hover:bg-[#272249] bg-[#363062]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-6 ml-0 p-4 text-lg pr-20 border-2 font-inter text-[#818fb4] border-[#f5e8c7] rounded-2xl outline-none hover:bg-[#272249] bg-[#363062]"
          />
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <p className="font-inter mb-6 text-[#f5e8c7] text-center mt-0 ml-5 pl-6 text-[16px] hover:underline">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <button
            type="submit"
            className="w-64 ml-10 p-8 text-center bg-[#f5e8c7] shadow-black shadow-2xl text-[#363062] text-xl font-inter py-1 px-6 rounded-2xl hover:outline hover:outline-[#363062] hover:outline-3"
          >
            LOGIN
          </button>
        </form>
        <p className="font-inter mb-6 text-[#f5e8c7] text-center mt-0 ml-5 pl-6 text-sm p-4 pt-8">
          Don't have an account?{" "}
          <a className="hover:underline" href="/sign-up">
            Sign Up
          </a>
        </p>
      </div>
      <div className="absolute right-60 transform scale-150">
        <img src={logo5} className="w-[600px] mb-12" alt="PennyWise Logo" />
      </div>
    </div>
  );
};

export default Login;
