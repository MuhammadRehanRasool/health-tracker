import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";

export default function Exercise() {
  const { session, setSession } = React.useContext(UserData);
  const [data, setData] = useState({});

  return (
    <div className="__Exercise">
      <h1>Exercises</h1>
      <br />
      <h3 className="text-muted">Add Exercise</h3>
      <div className="form">
        <div className="one">
          {/* <input
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            value={credentials.password}
            onChange={changeCredentials}
          /> */}
        </div>
      </div>
    </div>
  );
}
