import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Layout from "./components/Layout";
import Exercise from "./views/Exercise";
import MuscleGroup from "./views/MuscleGroup";
import Workout from "./views/Workout";
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
