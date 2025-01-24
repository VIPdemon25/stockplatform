import React, { useState, useEffect } from "react"
import { User, Mail, AtSign } from "lucide-react"
import { Link } from "react-router-dom"

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  })

  useEffect(() => {
    // Simulating an API call to fetch account details
    setTimeout(() => {
      setAccountDetails({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        username: "johndoe123",
      })
    }, 1000)
  }, [])

  return (
    <div className="account-details animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/home" className="btn btn-primary">
          Home
        </Link>
        <h2 className="text-primary mb-0">Account Details</h2>
      </div>
      <div className="card bg-dark">
        <div className="card-body">
          {/* ... rest of the card body content ... */}
          <div className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            <label className="form-label text-light">First Name</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-light">
                <User size={18} />
              </span>
              <input
                type="text"
                className="form-control bg-dark text-light"
                value={accountDetails.firstName}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4 animate__animated animate__fadeInUp animate__delay-2s">
            <label className="form-label text-light">Last Name</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-light">
                <User size={18} />
              </span>
              <input type="text" className="form-control bg-dark text-light" value={accountDetails.lastName} readOnly />
            </div>
          </div>
          <div className="mb-4 animate__animated animate__fadeInUp animate__delay-3s">
            <label className="form-label text-light">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-light">
                <Mail size={18} />
              </span>
              <input type="email" className="form-control bg-dark text-light" value={accountDetails.email} readOnly />
            </div>
          </div>
          <div className="mb-4 animate__animated animate__fadeInUp animate__delay-4s">
            <label className="form-label text-light">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-light">
                <AtSign size={18} />
              </span>
              <input type="text" className="form-control bg-dark text-light" value={accountDetails.username} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails