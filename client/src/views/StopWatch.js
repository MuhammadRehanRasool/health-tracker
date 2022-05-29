import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosApi";
import UserData from "../components/UserData";

const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const Timer = (props) => {
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(0, props.add);

  return (
    <div className="row mt-5">
      <div className="stopwatch-card">
        <p>{formatTime(timer)}</p>
        <div className="buttons">
          {!isActive && !isPaused ? (
            <button className="button bg-success" onClick={handleStart}>
              Start
            </button>
          ) : isPaused ? (
            <button className="button bg-warning" onClick={handlePause}>
              Pause
            </button>
          ) : (
            <button className="button bg-primary" onClick={handleResume}>
              Resume
            </button>
          )}
          <button
            className={`button btn ${
              !isActive ? "bg-dark disabaled" : "bg-danger"
            }`}
            onClick={handleReset}
            disabled={!isActive}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const useTimer = (initialState = 0, add) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    add(timer);
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};

export default function StopWatch() {
  const { session, setSession } = React.useContext(UserData);
  const [entries, setEntries] = useState([]);

  const myData = async (e) => {
    await axiosInstance
      .get(`/stopwatch/${session.personal.id}`)
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const add = async (seconds) => {
    await axiosInstance
      .post(`/stopwatch`, {
        user: session.personal.id,
        seconds: seconds,
      })
      .then((response) => {
        myData();
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
    <div className="__Mixed __Timer">
      <h1>Stop Watch</h1>
      <Timer add={add} />
      <br />
      <div className="view my-5">
        <h3 className="text-muted">Logs</h3>
        {entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Session Length</th>
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
                      <th scope="col">{parseFloat(parseInt(one.seconds) / 60).toFixed(2)} minutes</th>
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
