import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

