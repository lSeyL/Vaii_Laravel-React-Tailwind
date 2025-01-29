import React, { useState } from "react";

import api from "../../services/api";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/signup", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess("Account created successfully! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create an account.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Card */}
      <div
        className="bg-white bg-cover bg-center rounded-2xl shadow-lg w-full max-w-7xl p-8 md:p-12 flex flex-col lg:flex-row overflow-hidden"
        style={{
          backgroundImage: "url('/LoginBackground.png')",
        }}
      >
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col order-2 lg:order-1 bg-white/ rounded-lg">
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center text-black hover:text-gray-400 transition duration-300 mb-6"
          >
            <HiArrowLeft className="w-7 h-7 mr-2 ml-3" />
            <span className="text-lg">Home</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-gray-800 ml-3">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600 mb-6 ml-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-full p-3 mt-1 focus:ring-2 duration-300 focus:ring-black focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-full p-3 mt-1 focus:ring-2 duration-300 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block ml-3 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded-full p-3 mt-1 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block ml-3 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="w-full border border-gray-300 rounded-full p-3 mt-1 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white text-base rounded-full hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-8">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          {/* Social Signup Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            {/* Google Icon Button */}
            <button className="flex items-center justify-center bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
              <FaGoogle className="w-6 h-6" />
            </button>

            {/* Facebook Icon Button */}
            <button className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
              <FaFacebook className="w-6 h-6" />
            </button>

            {/* Apple Icon Button */}
            <button className="flex items-center justify-center bg-gray-800 text-white p-3 rounded-full hover:bg-black transition">
              <FaApple className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Background Image (Right Side) */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center order-1 lg:order-2"
          style={{
            backgroundImage: `url('https://via.placeholder.com/600x800?text=Background+Image')`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Register;
