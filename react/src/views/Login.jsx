import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import Nav from "../components/Nav.jsx";

function Login() {
  return (
    <div>
      <Nav />

      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {message && (
              <div className="alert">
                <p>{message}</p>
              </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account.</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
