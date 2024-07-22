import { useState } from "react";
import { Link } from "react-router-dom";
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import './login.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-image-container">
      <LogoSvg className="login-image" />
      </div>
      <div className="login-form-container">
        <form className="login-form">
          <h1 className="login-title">Let's go.</h1>
          <label className="login-input-container">
            <MdOutlineMail />
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              name="username"
            />
          </label>
          <label className="login-input-container">
            <MdPassword />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
            />
          </label>
          <button className="login-button">Login</button>
        </form>
        <div className="login-signin-container">
          <p className="login-signin-text">Don't have an account?</p>
          <Link to="/register">
            <button className="login-button-outline">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

