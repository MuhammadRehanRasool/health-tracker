import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";
import "./../css/mixed.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

export default function Exercise() {
  const { session, setSession } = React.useContext(UserData);
  const __init = {
    name: "",
    user: "",
    muscleGroup: "",
  };
  const [data, setData] = useState(__init);
  const [entries, setEntries] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState([]);
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
    if (data.name !== "") {
      await axiosInstance
        .post("/exercise", {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.message) {
            setMessage(response.message, "danger");
          } else {
            setMessage(`${data.name} added!`, "success");
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
      .get(`/exercise/${session.personal.id}`)
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
        .put(`/exercise/${isEdit.id ? isEdit.id : ""}`, {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.message) {
            setMessage(response.message, "danger");
          } else {
            setMessage(`${data.name} updated!`, "success");
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
      .delete(`/exercise/${id}`)
      .then((response) => {
        setMessage(`Deleted!`, "success");
        myData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchMuscleGroup = async (e) => {
    await axiosInstance
      .get(`/muscle_group/${session.personal.id}`)
      .then((response) => {
        setMuscleGroup(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (session.personal.id !== "") {
      fetchMuscleGroup();
      myData();
    }
  }, [session]);

  return (
    <div className="__Mixed">
      <h1>Exercise</h1>
      <div className="add my-5">
        <h3 className="text-muted">
          {isEdit.status ? "Update" : "Add"} Exercise
        </h3>
        <div className="form">
          <div className="one mb-2">
            <input
              name="name"
              placeholder="Name"
              type="text"
              value={data.name}
              onChange={changeData}
            />
          </div>
          <div className="one mb-4">
            <select
              className="form-select form-control"
              name="muscleGroup"
              value={data.muscleGroup}
              onChange={changeData}
            >
              <option
                value=""
                selected={data.muscleGroup === "" ? true : false}
              >
                Select Muscle Group
              </option>
              {muscleGroup.map((one, i) => {
                return (
                  <option
                    key={one.id}
                    value={one.id}
                    selected={data.muscleGroup === one ? true : false}
                  >
                    {one.name}
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
        <h3 className="text-muted">View Exercises</h3>
        {entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Muscle Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((one, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <th scope="col">{one.name}</th>
                      <th scope="col">{one.muscleGroup?.name}</th>
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
                              name: one.name,
                              muscleGroup: one.muscleGroup.id,
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
