import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSvg from "../svg/Logo";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import './login.css';
import { loginSchema } from "../../validations/loginValidation";
import ErrorComponent from "../error/ErrorComponent";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false
  });

  async function changeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await loginSchema.fields[name].validate(value);
      setErrors({ ...errors, [name]: '' });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  }

  const blurHandler = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const value = formData[name];

    try {
      loginSchema.fields[name].validateSync(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  async function loginSubmitHandler(e) {
    e.preventDefault();
    try {
      const isValid = await loginSchema.isValid(formData);
      if (!isValid) {
        throw new Error;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid login response');
      }
      dispatch(setUser(formData));
      console.log('Login successful!');
      navigate('/');
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, general: 'Invalid Login Inputs.' }));
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
          <label className={`login-input-container${touched.username && errors.username ? '-error' : ''}`}>
            <MdOutlineMail />
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              onBlur={() => blurHandler('username')}
            />
          </label>
          <label className={`login-input-container${touched.password && errors.password ? '-error' : ''}`}>
            <MdPassword />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              onBlur={() => blurHandler('password')}
            />
          </label>
          <button className="login-button">Login</button>
        </form>
        <div className="login-signin-container">
          <p className="login-signin-text">Don't have an account? <Link to="/register" className="login-signin-link">Sign up</Link></p>
        </div>
      </div>
      {errors.general && <ErrorComponent message={errors.general} onClose={() => setErrors((prevErrors) => ({ ...prevErrors, general: '' }))} />}
    </div>
  );
}
