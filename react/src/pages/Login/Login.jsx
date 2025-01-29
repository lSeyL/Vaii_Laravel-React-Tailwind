import React, { useState } from "react";
import api from "../../services/api";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowSmallLeft } from "react-icons/hi2";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("token: ");
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };
  /*

            */
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-white bg-cover bg-center rounded-2xl shadow-lg w-full max-w-7xl p-8 md:p-12 flex flex-col lg:flex-row overflow-hidden"
        style={{
          backgroundImage: "url('/LoginBackground.png')",
        }}
      >
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col order-2 lg:order-1 bg-white/ rounded-lg">
          <Link
            to="/"
            className="flex items-center text-black hover:text-gray-400 transition duration-300 mb-6"
          >
            <HiArrowLeft className="w-7 h-7 mr-2 ml-3" />
            <span className="text-lg">Home</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-gray-800 ml-3">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 mb-6 ml-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create a new account
            </Link>
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className=" ml-3 block text-sm font-medium text-gray-700"
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white text-base rounded-full hover:bg-blue-600 transition"
              >
                Log In
              </button>
            </div>
          </form>
          {/* Divider */}
          <div className="flex items-center justify-between mt-8">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          {/* Social Login Buttons */}
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

export default Login;
