import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../css/auth.css";
import { axiosInstance } from "../axiosApi";
import { useNavigate } from "react-router-dom";
import { checkLoginFromLogin, setMessage, resetMessage } from "./../CONSTANT";

export default function Register() {
  let navigate = useNavigate();

  useEffect(() => {
    if (checkLoginFromLogin()) {
      navigate("/");
    }
  }, []);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const changeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const regsiter = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (
      credentials.email !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials.email)
    ) {
      if (
        credentials.password !== "" &&
        credentials.first_name !== "" &&
        credentials.last_name !== "" &&
        credentials.username !== ""
      ) {
        await axiosInstance
          .post("users", credentials)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data;
              if (res.message) {
                let message = "";
                if (res.message.email) {
                  message += "Email : ";
                  message +=
                    res.message.email.map((a, b) => {
                      return a + " ";
                    }) + "<br/>";
                }
                if (res.message.username) {
                  message += "Username : ";
                  message +=
                    res.message.username.map((a, b) => {
                      return a + " ";
                    }) + "<br/>";
                }
                if (res.message.password) {
                  message += "Password : ";
                  message +=
                    res.message.password.map((a, b) => {
                      return a + " ";
                    }) + "<br/>";
                }
                setMessage(message, "danger");
              } else {
                axiosInstance
                  .post("/token/obtain", {
                    username: credentials.username,
                    password: credentials.password,
                  })
                  .then((response) => {
                    if (response.data) {
                      axiosInstance.defaults.headers["Authorization"] =
                        "JWT " + response.data.access;
                      localStorage.setItem(
                        "access_token",
                        response.data.access
                      );
                      localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                      );
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
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setMessage("Fill All Fields", "danger");
      }
    } else {
      setMessage("Please Enter Valid Email", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Register";
  };
  return (
    <div className="__Auth">
      <div className="form card bg-light">
        <h1>Register</h1>
        <div className="fields">
          <div className="one">
            <input
              name="first_name"
              placeholder="First Name"
              id="first_name"
              type="text"
              value={credentials.first_name}
              onChange={changeCredentials}
            />
          </div>
          <div className="one">
            <input
              name="last_name"
              placeholder="Last Name"
              id="last_name"
              type="text"
              value={credentials.last_name}
              onChange={changeCredentials}
            />
          </div>
          <div className="one">
            <input
              name="email"
              placeholder="Email"
              id="email"
              type="email"
              value={credentials.email}
              onChange={changeCredentials}
            />
          </div>
          <div className="one">
            <input
              name="username"
              placeholder="Username"
              id="username"
              type="text"
              value={credentials.username}
              onChange={changeCredentials}
            />
          </div>
          <div className="one">
            <input
              name="password"
              placeholder="Password"
              id="password"
              type="password"
              value={credentials.password}
              onChange={changeCredentials}
            />
          </div>
        </div>
        <button className="button" onClick={regsiter}>
          Register
        </button>
        <span className="redirect">
          Already have an account? Login <Link to="/login">here</Link>
        </span>
        <span id="error" style={{ display: "none" }}></span>
      </div>
    </div>
  );
}
