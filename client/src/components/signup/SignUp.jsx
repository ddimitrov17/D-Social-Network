import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdDriveFileRenameOutline, MdPassword } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import './signup.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function signUpSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData), //TODO: Refactor this function
      });

      if (!response.ok) {
        throw new Error();
        //TODO Error handling
      }
      console.log('Sign up successful!'); //TODO: Remove this
    } catch (error) {
      console.error('There was a problem with the signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image-container">
        <LogoSvg className="signup-image" />
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={signUpSubmitHandler}>
          <h1 className="signup-title">Join today.</h1>
          <label className="signup-input-container">
            <MdOutlineMail />
            <input type="email" className="signup-input" placeholder="Email" name="email" onChange={changeHandler} />
          </label>
          <div className="signup-input-group">
            <label className="signup-input-container">
              <FaUser />
              <input type="text" className="signup-input" placeholder="Username" name="username" onChange={changeHandler} />
            </label>
            <label className="signup-input-container">
              <MdDriveFileRenameOutline />
              <input type="text" className="signup-input" placeholder="Full Name" name="fullName" onChange={changeHandler} />
            </label>
          </div>
          <label className="signup-input-container">
            <MdPassword />
            <input type="password" className="signup-input" placeholder="Password" name="password" onChange={changeHandler} />
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
