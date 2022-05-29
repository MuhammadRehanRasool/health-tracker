import React, { useState, useEffect } from "react";
import { axiosInstance } from "../axiosApi";
import { setMessage, resetMessage } from "./../CONSTANT";
import UserData from "../components/UserData";
import "./../css/mixed.css";

export default function BMI() {
  const { session, setSession } = React.useContext(UserData);
  const __init = {
    height: "",
    weight: "",
    user: "",
  };
  const [data, setData] = useState(__init);
  const [entries, setEntries] = useState([]);
  const [result, setResult] = useState({
    height: "",
    weight: "",
    bmi: "",
    status: "",
    user: "",
    isResponce: false,
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
    setResult({
      height: "",
      weight: "",
      bmi: "",
      status: "",
      user: "",
      isResponce: false,
    });
    if (data.height !== "" && data.weight !== "") {
      await axiosInstance
        .post("/bmi", {
          ...data,
          user: session.personal.id,
        })
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message, "danger");
          } else {
            setResult({ ...response.data, isResponce: true });
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
    e.target.innerHTML = "Calculate";
  };

  const myData = async (e) => {
    await axiosInstance
      .get(`/bmi/${session.personal.id}`)
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (session.personal.id !== "") {
      myData();
    }
  }, [session]);

  return (
    <div className="__Mixed">
      <h1>Body Mass Index</h1>
      <div className="add my-5">
        <h3 className="text-muted">Calculate</h3>
        {result.isResponce ? (
          <div className="result">
            <span className="main">
              <span className="attr">Height :</span>
              <span className="val">{result.height} cm</span>
            </span>
            <span className="main">
              <span className="attr">Weight :</span>
              <span className="val">{result.weight} kg</span>
            </span>
            <span className="main">
              <span className="attr">BMI :</span>
              <span className="val">{parseFloat(result.bmi).toFixed(2)} %</span>
            </span>
            <span className="main">
              <span className="attr">Status :</span>
              <span
                className={`val text-${
                  result.status === "Healthy"
                    ? "success"
                    : result.status === "Obesity"
                    ? "danger"
                    : "warning"
                }`}
              >
                {result.status}
              </span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="form">
          <div className="one mb-2">
            <input
              name="height"
              placeholder="Height (CM)"
              type="number"
              value={data.height}
              onChange={changeData}
            />
          </div>
          <div className="one mb-4">
            <input
              name="weight"
              placeholder="Weight (KG)"
              type="number"
              value={data.weight}
              onChange={changeData}
            />
          </div>
          <span id="error" style={{ display: "none" }}></span>
          <button className="button" onClick={addData}>
            Calculate
          </button>
        </div>
      </div>
      <br />
      <div className="view my-3">
        <h3 className="text-muted">Logs</h3>
        {entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Height</th>
                  <th scope="col">BMI</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((one, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <th scope="col">
                        {new Date(one.datetime).toLocaleString()}
                      </th>
                      <th scope="col">{one.weight} kg</th>
                      <th scope="col">{one.height} cm</th>
                      <th scope="col">{parseFloat(one.bmi).toFixed(2)} %</th>
                      <th
                        scope="col"
                        className={`text-${
                          one.status === "Healthy"
                            ? "success"
                            : one.status === "Obesity"
                            ? "danger"
                            : "warning"
                        }`}
                      >
                        {one.status}
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
