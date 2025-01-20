import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdDriveFileRenameOutline, MdPassword } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { signUpSchema } from '../../validations/signUpValidation';
import ErrorComponent from '../error/ErrorComponent';
import './signup.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    fullName: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    username: false,
    fullName: false,
    password: false
  });

  async function changeHandler(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    try {
      await signUpSchema.fields[name].validate(value);
      setErrors({ ...errors, [name]: false });
    } catch (error) {
      setErrors({ ...errors, [name]: true });
    }
  }

  const blurHandler = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const value = formData[name];

    try {
      signUpSchema.fields[name].validateSync(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
  };

  async function signUpSubmitHandler(e) {
    e.preventDefault();
    try {
      const isValid = await signUpSchema.isValid(formData);
      if (!isValid) {
        throw new Error;
      }
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error();
      }
      dispatch(setUser(formData));
      navigate('/');
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, general: 'Invalid sign up inputs.' }));
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-image-container">
        <LogoSvg className="signup-image" />
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={signUpSubmitHandler}>
          <h1 className="signup-title">Join today.</h1>

          <label className={`signup-input-container${touched.email && errors.email ? '-error' : ''}`}>
            <MdOutlineMail />
            <input
              type="email"
              className='signup-input'
              placeholder="Email"
              name="email"
              onChange={changeHandler}
              onBlur={() => blurHandler('email')}
            />
          </label>

          <div className="signup-input-group">
            <label className={`signup-input-container${touched.username && errors.username ? '-error' : ''}`}>
              <FaUser />
              <input
                type="text"
                className='signup-input'
                placeholder="Username"
                name="username"
                onChange={changeHandler}
                onBlur={() => blurHandler('username')}
              />
            </label>

            <label className={`signup-input-container${touched.fullName && errors.fullName ? '-error' : ''}`}>
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className='signup-input'
                placeholder="Full Name"
                name="fullName"
                onChange={changeHandler}
                onBlur={() => blurHandler('fullName')}
              />
            </label>
          </div>

          <label className={`signup-input-container${touched.password && errors.password ? '-error' : ''}`}>
            <MdPassword />
            <input
              type="password"
              className='signup-input'
              placeholder="Password"
              name="password"
              onChange={changeHandler}
              onBlur={() => blurHandler('password')}
            />
          </label>

          <button className="signup-button">Sign up</button>
        </form>

        <div className="signup-signin-container">
          <p className="signup-signin-text">Already have an account? <Link to="/login" className="signup-signin-link">Sign in</Link></p>
        </div>
      </div>

      {errors.general && <ErrorComponent message={errors.general} onClose={() => setErrors((prevErrors) => ({ ...prevErrors, general: '' }))} />}
    </div>
  );
}