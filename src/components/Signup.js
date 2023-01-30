import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  const navigate = useNavigate();

  const [userData, setuserData] = useState({ fullname: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: userData.fullname, email: userData.email, password: userData.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('authToken', json.authToken);
      console.log(localStorage.getItem('authToken'));
      navigate('/');
    }
    else{
      alert(json.error);
    }

  }

  const onchangeHandler = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Name</label>
          <input type="text" className="form-control" id="fullname" name="fullname" onChange={onchangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onchangeHandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onchangeHandler} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup