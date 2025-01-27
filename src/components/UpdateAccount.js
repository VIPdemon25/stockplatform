import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UpdateAccount = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First name must be at least 3 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(3, "Last name must be at least 3 characters")
      .required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/@cognizant\.com$/, "Only @cognizant.com emails are allowed")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Set loading state to true
        formik.setSubmitting(true);

        // Send the updated data to the backend using Axios
        const response = await axios.put("/api/account/update", values); // Replace with your API endpoint

        // Log the response (for debugging)
        console.log("Account updated successfully:", response.data);

        // Display success message
        alert("Account updated successfully!");

        // Reset the form fields
        resetForm();
      } catch (error) {
        // Handle errors (e.g., display error message)
        console.error("Failed to update account:", error.response?.data || error.message);
        alert("Failed to update account. Please try again.");
      } finally {
        // Set loading state to false
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div className="update-account animate__animated animate__fadeIn">
      <Link to="/home" className="btn btn-primary position-absolute top-0 end-0 m-3">
        Home
      </Link>
      <h2 className="mb-4 text-primary">Update Account</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
            }`}
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          ) : null}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""
            }`}
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          ) : null}
        </div>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.username && formik.errors.username ? "is-invalid" : ""
            }`}
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="invalid-feedback">{formik.errors.username}</div>
          ) : null}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password ? "is-invalid" : ""
            }`}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting} // Disable button while submitting
        >
          {formik.isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;