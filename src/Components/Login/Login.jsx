import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/Admin/adminlogin', {
        email,
        password,
      });
      navigate('/admindashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data.msg);
        alert(error.response.data.msg);
      } else {
        console.error(error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />{' '}
          <br />
          <button type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <a href="/sign">
              <b>Sign Up</b>
            </a>
          </p>
          <br />
          <p>
            Forgot password?{' '}
            <a href="/forgot">
              <b>Reset</b>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
