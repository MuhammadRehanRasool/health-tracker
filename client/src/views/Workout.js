import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";
import "./../css/mixed.css";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";

export default function Workout() {
  const { session, setSession } = React.useContext(UserData);
  const __init = {
    name: "",
    user: "",
    muscleGroup: "",
    exercises: {
      list: [],
    },
  };
  const [data, setData] = useState(__init);
  const [entries, setEntries] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [search, setSearch] = useState("");
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
        .post("/workout", {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message, "danger");
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
      .get(`/workout/${session.personal.id}`)
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
    if (data.name !== "" && data.exercises.list.length > 0) {
      await axiosInstance
        .put(`/workout/${isEdit.id ? isEdit.id : ""}`, {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message, "danger");
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
      setMessage(
        "Please fill all inputs and make sure to select atleast one exercise!",
        "danger"
      );
    }
    e.target.style.pointerEvents = "unset";
    e.target.innerHTML = "Add";
  };

  const deleteData = async (id) => {
    await axiosInstance
      .delete(`/workout/${id}`)
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

  const fetchExercises = async (e) => {
    await axiosInstance
      .get(`/exercise/${session.personal.id}`)
      .then((response) => {
        setExercise(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (session.personal.id !== "") {
      fetchMuscleGroup();
      fetchExercises();
      myData();
    }
  }, [session]);

  const addToList = (id) => {
    setData({
      ...data,
      exercises: {
        list: [...data.exercises.list, id],
      },
    });
  };

  const removeFromList = (id) => {
    let array = data.exercises.list;
    let index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
    }
    setData({
      ...data,
      exercises: {
        list: [...array],
      },
    });
  };

  return (
    <div className="__Mixed">
      <h1>Workout</h1>
      <div className="add my-5">
        <h3 className="text-muted">
          {isEdit.status ? "Update" : "Add"} Workout
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
          <div className="one mb-2">
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
                    selected={
                      data.muscleGroup === one.id.toString() ? true : false
                    }
                  >
                    {one.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="custom-exercises-wrapper">
            <h5 className="text-muted">Select Exercises</h5>
            <div className="mb-4 custom-exercises">
              {exercise.length > 0 ? (
                <>
                  <span
                    style={{ padding: "0" }}
                    className="one col category-custom category-input"
                  >
                    <input
                      placeholder="Search exercises..."
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </span>
                  {exercise
                    .filter((one, i) => {
                      return (
                        one.name.toLowerCase().includes(search.toLowerCase()) ||
                        one.muscleGroup?.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        data.exercises.list.includes(one.id)
                      );
                    })
                    .map((one, i) => {
                      return (
                        <span
                          className={`col category-custom ${
                            data.exercises.list.includes(one.id)
                              ? "bg-success"
                              : "bg-secondary"
                          } text-light`}
                          onClick={() => {
                            if (data.exercises.list.includes(one.id)) {
                              removeFromList(one.id);
                            } else {
                              addToList(one.id);
                            }
                          }}
                        >
                          {one.name}{" "}
                          {one.muscleGroup ? (
                            <span className="mx-2 badge bg-light text-dark">
                              {one.muscleGroup.name}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      );
                    })}
                </>
              ) : (
                "No Exercises"
              )}
            </div>
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
        <h3 className="text-muted">View Workouts</h3>
        {entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Muscle Group</th>
                  <th scope="col">Exercises</th>
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
                      <th scope="col d-flex justify-content-center align-items-center">
                        <span
                          className="text-muted d-flex align-items-center"
                          style={{ maxWidth: "200px" }}
                        >
                          {one.exercises.list
                            .map((two, j) => {
                              return exercise.filter((three, k) => {
                                return three.id === two;
                              })[0]?.name;
                            })
                            .join(", ")}
                        </span>
                      </th>
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
                              muscleGroup: one.muscleGroup
                                ? one.muscleGroup.id
                                : "",
                              user: "",
                              exercises: one.exercises,
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
