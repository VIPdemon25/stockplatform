import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const nodeRef = useRef(null);

  React.useEffect(() => {
    setShowForm(true);
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/login", values);
        console.log("Login successful", response.data);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (error) {
        console.error("Login failed", error.response?.data || error.message);
        // Handle login error (e.g., show error message)
      }
    },
  });

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <Link to="/" className="position-absolute top-0 start-0 m-4 text-light home-link">
        <i className="fas fa-home me-2"></i>Home
      </Link>
      <CSSTransition in={showForm} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef}>
        <div ref={nodeRef} className="card bg-dark text-light shadow-lg" style={{ width: "20rem" }}>
          <div className="card-body">
            <h2 className="card-title text-center mb-4 text-primary">Login to Elevate</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control bg-dark text-light border-primary animate__animated animate__fadeInUp animate__faster"
                  placeholder="Enter your username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
                ) : null}
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
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
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
  );
};

export default Login;