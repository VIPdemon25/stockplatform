import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import EmployeeHomePage from "./components/EmployeeHomePage";
import SignupEmployee from "./components/SignupEmployee";
import AllTrades from "./components/AllTrades";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JavaScript
import "./App.css";
// import "animate.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/employee-home" element={<EmployeeHomePage />} />
          <Route path="/signup-employee" element={<SignupEmployee/>}/>
          <Route path="/all-trades" element={<AllTrades />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
