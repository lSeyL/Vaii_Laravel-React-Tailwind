import React, { useRef, useState } from "react";

import api from "../../services/api";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import { useStateContext } from "../../providers/userContext";
import { validateUserCredentials } from "../../utils/validation";
function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [message, setMessage] = useState(null);
  const { setUser, setToken, token } = useStateContext();
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/profile" replace />;
  }
  const onSubmit = (ev) => {
    ev.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = passwordConfirmationRef.current.value;
    const error = validateUserCredentials(
      email,
      password,
      true,
      password_confirmation
    );
    if (error) {
      setMessage(error);
      return;
    }
    const payload = {
      name,
      email,
      password,
      password_confirmation,
    };
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    api
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("User signup error");
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="bg-white bg-cover bg-center rounded-2xl shadow-lg w-full max-w-7xl p-8 md:p-12 flex flex-col lg:flex-row overflow-hidden animate-fadeInUp"
        style={{
          backgroundImage: "url('/LoginBackground.png')",
        }}
      >
        <div className="w-full lg:w-1/2 md:w-2/3 sm:w-5/6 p-6 md:p-10 flex flex-col order-2 lg:order-1 bg-white/ rounded-lg">
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
          <p className="text-m lg:text-sm text-gray-600 mb-6 ml-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 text-lg lg:text-base hover:text-blue-700 transition-all duration-300"
            >
              Log in
            </Link>
          </p>
          {message && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm font-medium border border-red-400 mb-4">
              {message}
            </div>
          )}
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
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
                ref={nameRef}
              />
            </div>

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
                ref={emailRef}
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
                ref={passwordRef}
              />
            </div>

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
                ref={passwordConfirmationRef}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-stone-800 text-white text-base rounded-full hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-8">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <button className="flex items-center justify-center bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
              <FaGoogle className="w-6 h-6" />
            </button>

            <button className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
              <FaFacebook className="w-6 h-6" />
            </button>

            <button className="flex items-center justify-center bg-gray-800 text-white p-3 rounded-full hover:bg-black transition">
              <FaApple className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
