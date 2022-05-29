import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";
import "./../css/mixed.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

export default function Schedule() {
  const { session, setSession } = React.useContext(UserData);
  const __init = {
    day: "",
    user: "",
    workout: "",
  };
  const [data, setData] = useState(__init);
  const [entries, setEntries] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: null,
  });

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
    if (data.day !== "" && data.workout !== "") {
      await axiosInstance
        .post("/schedule", {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message, "danger");
          } else {
            setMessage(`${data.day} scheduled!`, "success");
            setData(__init);
            myData();
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

  const myData = async (e) => {
    await axiosInstance
      .get(`/schedule/${session.personal.id}`)
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editData = async (e) => {
    e.target.style.pointerEvents = "none";
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>';
    e.preventDefault();
    resetMessage();
    if (data.name !== "") {
      await axiosInstance
        .put(`/schedule/${isEdit.id ? isEdit.id : ""}`, {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message, "danger");
          } else {
            setMessage(`${data.day} scheduled!`, "success");
            myData();
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setData(__init);
      setIsEdit({
        status: false,
        id: null,
      });
    } else {
      setMessage("Please fill all inputs!", "danger");
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Add";
  };

  const deleteData = async (id) => {
    await axiosInstance
      .delete(`/schedule/${id}`)
      .then((response) => {
        setMessage(`Deleted!`, "success");
        myData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWorkout = async (e) => {
    await axiosInstance
      .get(`/workout/${session.personal.id}`)
      .then((response) => {
        setWorkout(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (session.personal.id !== "") {
      fetchWorkout();
      myData();
    }
  }, [session]);

  return (
    <div className="__Mixed">
      <h1>Workout Schedule</h1>
      <div className="add my-5">
        <h3 className="text-muted">
          {isEdit.status ? "Update" : "Add"} Schedule
        </h3>
        <div className="form">
          <div className="one mb-2">
            <select
              className="form-select form-control"
              name="day"
              value={data.day}
              onChange={changeData}
            >
              <option
                value=""
                selected={data.day === "" ? true : false}
                disabled
              >
                Select Day
              </option>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((one, i) => {
                return (
                  <option
                    key={one}
                    value={one}
                    selected={data.workout === one ? true : false}
                    disabled={
                      entries.length > 0 &&
                      entries.filter((item, index) => {
                        return one === item.day;
                      }).length > 0
                        ? true
                        : false
                    }
                  >
                    {one}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="one mb-4">
            <select
              className="form-select form-control"
              name="workout"
              value={data.workout}
              onChange={changeData}
            >
              <option
                value=""
                selected={data.workout === "" ? true : false}
                disabled
              >
                Select Workout
              </option>
              {workout.map((one, i) => {
                return (
                  <option
                    key={one.id}
                    value={one.id}
                    selected={data.workout === one ? true : false}
                  >
                    {one.name}{" "}
                    {entries.length > 0
                      ? `(${
                          entries.filter((item, index) => {
                            return one.id === item.workout?.id;
                          }).length
                        } day)`
                      : ""}
                  </option>
                );
              })}
            </select>
          </div>
          <span id="error" style={{ display: "none" }}></span>
          <button
            className="button"
            onClick={isEdit.status ? editData : addData}
          >
            {isEdit.status ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <br />
      <div className="view my-3">
        <h3 className="text-muted">View Schedules</h3>
        {entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Day</th>
                  <th scope="col">Workout</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((one, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <th scope="col">{one.day}</th>
                      <th scope="col">{one.workout?.name}</th>
                      <th scope="col">
                        <span
                          role="button"
                          className="text-danger"
                          onClick={(e) => {
                            deleteData(one.id);
                          }}
                        >
                          <AiFillDelete />
                        </span>
                        <span
                          role="button"
                          className="ms-5 text-success"
                          onClick={(e) => {
                            setIsEdit({
                              status: true,
                              id: one.id,
                            });
                            setData({
                              day: one.day,
                              workout: one.workout ? one.workout.id : "",
                              user: "",
                            });
                          }}
                        >
                          <AiTwotoneEdit />
                        </span>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          "No Entries"
        )}
      </div>
    </div>
  );
}
