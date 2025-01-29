import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...User });
      localStorage.setItem("firstlogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="login_page">
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          name="name"
          id="username"
          placeholder="Enter your username..."
          value={User.name}
          onChange={onChangeUser}
          required
          autoComplete={false}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          value={User.email}
          onChange={onChangeUser}
          required
          autoComplete={false}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password..."
          value={User.password}
          onChange={onChangeUser}
          required
          autoComplete={false}
        />

        <div className="login_btn">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
