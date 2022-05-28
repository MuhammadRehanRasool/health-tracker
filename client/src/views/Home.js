import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import UserData from "../components/UserData";
import { Link } from "react-router-dom";
import Card from "../components/Card";
export default function Home() {
  const { session, setSession } = React.useContext(UserData);
  const check = async (e) => {
    await axiosInstance
      .get("/hello")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   check();
  // }, []);

  return (
    <div className="__Home">
      <span className="pull-me-right display-6 text-muted">
        Welcome {session.personal.username}!
      </span>
      <div className="mt-5 p-4 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-6">
            <Card
              link="/muscleGroup"
              title="Muscle Group"
              kinds="Add/View/Update"
              tagline="Muscle Groups"
            />
          </div>
          <div className="col-6">
            <Card
              link="/exercise"
              title="Exercise"
              kinds="Add/View/Update"
              tagline="Exercises"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
