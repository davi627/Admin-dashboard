import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'




const Reset = () => {
  const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate= useNavigate()
    const {token} = useParams()
  
    axios.defaults.withCredentials=true;
    const handleSubmit= async (e)=>{
      e.preventDefault()
      const url = `http://localhost:3000/Admin/reset/${token}`
      const response = await axios.post(url,{
        password,
      },)
      console.log(response);
      try {
       
         navigate('/') 
        
      } catch (error) {
        console.log(error)
        setError(error)
      }
    }

  return (
    <div className='login-wrapper'>
    <div className="login-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
            <label>New password</label>
            <input type="password" id="password" name="password" placeholder="new password" onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit'>Reset</button>
        </form>
    </div>
    </div>
  )
}

export default Reset