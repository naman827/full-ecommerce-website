import React, { useContext } from "react";
import { Link } from "react-router";
import { MdMenu } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { GlobalState } from "../../globalStates";
import axios from "axios";

const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userApi.isLogged;
  const [isAdmin, setIsAdmin] = state.userApi.isAdmin;



  const logoutUser = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.clear();
      setIsAdmin(false); // Reset admin status
      setIsLogged(false); // Reset logged-in status
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <h1>
            <Link to="/">
              Tech<span className="yellow-span">one</span>
              {isAdmin && " Admin"}
            </Link>
          </h1>
        </div>
        <ul>
          <li className="active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
          </li>
          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter() 
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        {!isAdmin && (
          <div className="cart">
            <span>0</span>
            <Link to="/cart">
              <IoCart width={40} />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
