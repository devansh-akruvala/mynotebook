import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if(json.success){
      // save authtoken and redirect
      localStorage.setItem('authToken',json.authToken);
      navigate('/');
    } 
    else{
      alert(json.error)
    }
  }

  const handleOnChange = (e) => {
    setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange}/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login