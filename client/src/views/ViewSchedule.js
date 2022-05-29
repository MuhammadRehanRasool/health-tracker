import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { axiosInstance } from "../axiosApi";
import UserData from "../components/UserData";
// import listWeek from "@fullcalendar/list";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function ViewSchedule() {
  const { session, setSession } = React.useContext(UserData);
  const [entries, setEntries] = useState([]);
  const todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const nextDay = (days, today = todayDate()) => {
    let nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + parseInt(days));
    let dd = String(nextDay.getDate()).padStart(2, "0");
    let mm = String(nextDay.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = nextDay.getFullYear();
    nextDay = yyyy + "-" + mm + "-" + dd;
    return nextDay;
  };

  const getDay = (date) => {
    return days[new Date(date).getDay()];
  };

  const myData = async (e) => {
    await axiosInstance
      .get(`/schedule/${session.personal.id}`)
      .then((response) => {
        let data = response.data;
        let temp = createWeek();
        data.map((one, i) => {
          let check = temp.filter((two, j) => {
            return two.day === one.day;
          });
          if (check.length > 0) {
            data[i]["date"] = check[0].date;
            data[i]["title"] = data[i].workout.name;
          }
        });
        setEntries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createWeek = () => {
    let temp = [];
    days.map((one, i) => {
      temp.push({
        title: "",
        date: i === 0 ? todayDate() : nextDay(i),
        day: i === 0 ? getDay(todayDate()) : getDay(nextDay(i)),
      });
    });
    return temp;
  };

  useEffect(() => {
    if (session.personal.id !== "") {
      myData();
    }
  }, [session]);

  return (
    <div className="__Mixed">
      <h1>View Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={entries}
      />
    </div>
  );
}