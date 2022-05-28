import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../css/Navbar.css";
import { axiosInstance } from "../axiosApi";
// import MenuIcon from "@mui/icons-material/Menu";

const Navbar = (props) => {
  let navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    sessionStorage.removeItem("loggedin");
    props.setSession(props.__init_session);
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between px-5 py-3 __Navbar">
        <Link to="/" className="navbar-brand">Health Tracker</Link>
        <button className="button pull-me-right" onClick={logout}>
          Log Out
        </button>
      </nav>
    </>
  );
};

export default Navbar;
