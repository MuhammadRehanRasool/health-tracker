import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Layout from "./components/Layout";
import Exercise from "./views/Exercise";
import MuscleGroup from "./views/MuscleGroup";
import Workout from "./views/Workout";
import ViewSchedule from "./views/ViewSchedule";
import Schedule from "./views/Schedule";
import StopWatch from "./views/StopWatch";
import BMI from "./views/BMI";
// import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/muscleGroup"
            element={
              <Layout>
                <MuscleGroup />
              </Layout>
            }
          />
          <Route
            path="/exercise"
            element={
              <Layout>
                <Exercise />
              </Layout>
            }
          />
          <Route
            path="/workout"
            element={
              <Layout>
                <Workout />
              </Layout>
            }
          />
          <Route
            path="/schedule"
            element={
              <Layout>
                <Schedule />
              </Layout>
            }
          />
          <Route
            path="/viewSchedule"
            element={
              <Layout>
                <ViewSchedule />
              </Layout>
            }
          />
          <Route
            path="/stopWatch"
            element={
              <Layout>
                <StopWatch />
              </Layout>
            }
          />
          <Route
            path="/bmi"
            element={
              <Layout>
                <BMI />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
