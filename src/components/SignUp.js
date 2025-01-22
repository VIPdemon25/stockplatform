import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    role: "",
  })
  const [showForm, setShowForm] = useState(false)
  const nodeRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the signup logic
    console.log("Signup submitted", formData)
  }

  useEffect(() => {
    setShowForm(true)
  }, [])

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <Link to="/" className="position-absolute top-0 start-0 m-4 text-light home-link">
        <i className="fas fa-home me-2"></i>Home
      </Link>
      <CSSTransition in={showForm} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef}>
        <div ref={nodeRef} className="card bg-dark text-light shadow-lg" style={{ width: "25rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4 text-primary">Sign Up for Elevate</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="fname"
                  placeholder="Enter your first name"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="lname"
                  placeholder="Enter your last name"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  id="role"
                  className="form-select bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="investor">Investor</option>
                  <option value="trader">Trader</option>
                  <option value="analyst">Analyst</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary animate__animated animate__fadeInUp animate__faster">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default SignUp

