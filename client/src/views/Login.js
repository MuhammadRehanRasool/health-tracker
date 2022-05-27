import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../css/auth.css";
import { axiosInstance } from "../axiosApi";
import { useNavigate } from "react-router-dom";
import { checkLoginFromLogin, setMessage, resetMessage } from "./../CONSTANT";

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    if (checkLoginFromLogin()) {
      navigate("/");
    }
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (credentials.username !== "") {
      if (credentials.password !== "") {
        await axiosInstance
          .post("/token/obtain", credentials)
          .then((response) => {
            if (response.data) {
              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);
              sessionStorage.setItem(
                "loggedin",
                JSON.stringify({
                  data: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    signedUpAt: response.data.signedUpAt,
                  },
                })
              );
              navigate("/");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setMessage("Please Enter Password", "danger");
      }
    } else {
      setMessage("Please Enter Username", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Log In";
  };
  return (
    <div className="__Auth">
      <div className="form">
        <h1>Log In</h1>
        <div className="fields">
          <div className="one">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              value={credentials.username}
              onChange={changeCredentials}
            />
          </div>
          <div className="one">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              value={credentials.password}
              onChange={changeCredentials}
            />
          </div>
        </div>
        <button className="button" onClick={login}>
          Log In
        </button>
        <span className="redirect">
          Don't have an account? Register one <Link to="/register">here</Link>
        </span>
        <span id="error" style={{ display: "none" }}></span>
      </div>
    </div>
  );
}
