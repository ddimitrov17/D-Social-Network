import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import './login.css';

export default function LoginPage() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  async function loginSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
      console.log('Login successful!'); //TODO: Remove this
      navigate('/');
    } catch (error) {
      console.error('There was a problem with the login:', error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-image-container">
        <LogoSvg className="login-image" />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={loginSubmitHandler}>
          <h1 className="login-title">Let's go.</h1>
          <label className="login-input-container">
            <MdOutlineMail />
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              name="username"
              onChange={onChangeHandler}
            />
          </label>
          <label className="login-input-container">
            <MdPassword />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
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

