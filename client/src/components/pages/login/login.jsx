import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
const Login = () => {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeUser=(e)=>{
    const {name,value}=e.target;
    setUser({...User,[name]:value})
  }

  const loginSubmit = async (e)=>{
      e.preventDefault()
      try {
        await axios.post('/user/login',{...User})
        localStorage.setItem('firstlogin',true)
        window.location.href = '/'
      } catch (error) {
        alert(error.response.data.msg)
      }
  }
  return (
    <div className="login_page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          value={User.email}
          onChange={onChangeUser}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter you password..."
          value={User.password}
          onChange={onChangeUser}
          required
        />

        <div className="login_btn">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
