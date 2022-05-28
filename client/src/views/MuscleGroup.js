import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";
import "./../css/mixed.css";
import Table from "../components/Table";

export default function MuscleGroup() {
  const { session, setSession } = React.useContext(UserData);
  const __init = {
    name: "",
    user: "",
  };
  const [data, setData] = useState(__init);

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addData = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (data.name !== "") {
      await axiosInstance
        .post("/muscle_group", {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.message) {
            setMessage(response.message, "danger");
          } else {
            setMessage(`${data.name} added!`, "success");
            setData(__init);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setMessage("Please fill all inputs!", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Add";
  };

  return (
    <div className="__Mixed">
      <h1>Muscle Group</h1>
      <div className="add my-5">
        <h3 className="text-muted">Add Muscle Group</h3>
        <div className="form">
          <div className="one mb-4">
            <input
              name="name"
              placeholder="Name"
              type="text"
              value={data.name}
              onChange={changeData}
            />
          </div>
          <span id="error" style={{ display: "none" }}></span>
          <button className="button" onClick={addData}>
            Add
          </button>
        </div>
      </div>
      <div className="view my-5">
        <h3 className="text-muted">View Muscle Groups</h3>
        <Table />
      </div>
    </div>
  );
}
