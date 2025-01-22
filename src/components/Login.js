import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showForm, setShowForm] = useState(false)
  const nodeRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login submitted", { username, password })
  }

  React.useEffect(() => {
    setShowForm(true)
  }, [])

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <Link to="/" className="position-absolute top-0 start-0 m-4 text-light home-link">
        <i className="fas fa-home me-2"></i>Home
      </Link>
      <CSSTransition in={showForm} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef}>
        <div ref={nodeRef} className="card bg-dark text-light shadow-lg" style={{ width: "20rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4 text-primary">Login to Elevate</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary animate__animated animate__fadeInUp animate__faster">
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Login

