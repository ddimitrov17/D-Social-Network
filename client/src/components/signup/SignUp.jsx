import React from 'react';
import { Link } from 'react-router-dom';
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdDriveFileRenameOutline, MdPassword } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import './signup.css';

export default function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-image-container">
      <LogoSvg className="signup-image" />
      </div>
      <div className="signup-form-container">
        <form className="signup-form">
          <h1 className="signup-title">Join today.</h1>
          <label className="signup-input-container">
            <MdOutlineMail />
            <input type="email" className="signup-input" placeholder="Email" name="email" />
          </label>
          <div className="signup-input-group">
            <label className="signup-input-container">
              <FaUser />
              <input type="text" className="signup-input" placeholder="Username" name="username" />
            </label>
            <label className="signup-input-container">
              <MdDriveFileRenameOutline />
              <input type="text" className="signup-input" placeholder="Full Name" name="fullName" />
            </label>
          </div>
          <label className="signup-input-container">
            <MdPassword />
            <input type="password" className="signup-input" placeholder="Password" name="password" />
          </label>
          <button className="signup-button">Sign up</button>
        </form>
        <div className="signup-signin-container">
          <p className="signup-signin-text">Already have an account?</p>
          <Link to="/login">
            <button className="signup-button-outline">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
