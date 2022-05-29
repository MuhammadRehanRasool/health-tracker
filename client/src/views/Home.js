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
        <div className="row d-flex">
          <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center align-items-center">
            <Card
              link="/muscleGroup"
              title="Muscle Group"
              kinds="Add/View/Update"
              tagline="Muscle Groups"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center align-items-center">
            <Card
              link="/exercise"
              title="Exercise"
              kinds="Add/View/Update"
              tagline="Exercises"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center align-items-center">
            <Card
              link="/workout"
              title="Workout"
              kinds="Add/View/Update"
              tagline="Workouts"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center align-items-center">
            <Card
              link="/schedule"
              title="Schedule"
              kinds="Add/View/Update"
              tagline="Schedule Workouts"
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-center align-items-center">
            <Card
              link="/viewSchedule"
              title="View Schedule"
              kinds="View"
              tagline="Calendar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
