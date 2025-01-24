import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import HomePage from "./components/HomePage"
import AccountDetails from "./components/AccountDetails"
import EmployeeHomePage from "./components/EmployeeHomePage"
import "bootstrap/dist/css/bootstrap.min.css" // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js" // Bootstrap JavaScript
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/account-details" element={<AccountDetails />} />
          {/* Use the `element` prop instead of `component` */}
          <Route path="/employee-home" element={<EmployeeHomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App