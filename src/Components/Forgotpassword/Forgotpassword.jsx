import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3000/Admin/forgotpassword`;
      const response = await axios.post(url, { email });
      console.log(response.data); // Log the response from the server
  
      alert("Email sent successfully!"); // Display a success message
  
      navigate('/'); // Navigate to the home page after successful submission
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Error sending reset email:', error.response.data.message);
        setError(error.response.data.message); // Set the error state with the error message
      } else {
        console.error('Error sending reset email:', error.toString());
        setError('Failed to send reset email. Please try again later.'); // Fallback error message
      }
    }
  };
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Forgot password</h2>
          <br />
          <label><b>Email</b></label>
          <br />
          <input type="email" name='email' id='email' placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
          <br />
          <button type="submit"><b>Send</b></button>
          <br />
          {error && <span>{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
