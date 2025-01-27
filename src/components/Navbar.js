import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Settings, User, LogOut, Trash2 } from "lucide-react";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  handleSearch,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Add logic here to delete the account
      console.log("Account deleted");
      // Redirect to login page or show a confirmation message
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Elevate
        </Link>
        <div className="d-flex align-items-center">
          <form onSubmit={handleSearch} className="d-flex me-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search stocks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-select me-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="construction">Construction</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
            </select>
            <button type="submit" className="btn btn-outline-light">
              <Search size={18} />
            </button>
          </form>
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="accountDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Settings size={18} />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="accountDropdown"
            >
              <li>
                <Link to="/home/account-details" className="dropdown-item">
                  <User size={18} className="me-2" />
                  Account Details
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link to="/home/update-account" className="dropdown-item">
                  <Settings size={18} className="me-2" />
                  Update Account
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  onClick={handleDeleteAccount}
                  className="dropdown-item text-danger"
                >
                  <Trash2 size={18} className="me-2" />
                  Delete Account
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="dropdown-item text-warning"
                >
                  <LogOut size={18} className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
