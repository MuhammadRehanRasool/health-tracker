import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import UserData from "../components/UserData";
export default function Home() {
  const { session, setSession } = React.useContext(UserData);
  // const check = async (e) => {
  //   await axiosInstance
  //     .get("/hello")
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   check();
  // }, []);

  return (
    <div className="__Home mt-5">
      <span className="pull-me-right display-6 text-muted">Welcome {session.personal.username}!</span>
    </div>
  );
}
