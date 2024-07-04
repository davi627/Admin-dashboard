import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/Admin/signup", {
        email,
        password,
      });
      alert("Registered");
      navigate('/');
    } catch (error) {
      console.error('Error during sign up:', error.response.data.msg); 
      alert('An error occurred during registration: ' + error.response.data.msg);
    }
  }

  return (
    <div className='login-wrapper'>
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label> <br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        /> <br />
        <label>Password</label> <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        /> <br />
        <label>Confirm Password</label> <br />
        <input
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          placeholder="confirm password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
    </div>
  );
}

export default Sign;
