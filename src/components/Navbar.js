import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Settings, User, LogOut, Trash2 } from "lucide-react"
import axios from "axios"
import SearchResults from "./SearchResults"

const Navbar = ({ handleLogout, stocks }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    setShowSearchResults(true)
    // console.log(stocks);

  }

  const handleSearchResultClick = (stock) => {
    setShowSearchResults(false)
    setSearchQuery("")
    navigate(`/home/stocks?id=${stock.stockId}`)
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const accountId = sessionStorage.getItem("accountId")
      const token = sessionStorage.getItem("token")
      try {
        await axios.delete(`http://localhost:9091/api/stocktrader/${accountId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Account deleted")
        navigate("/login")
      } catch (error) {
        console.error("There was an error deleting the account!", error)
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand">
          Elevate
        </Link>
        <div className="d-flex align-items-center position-relative" style={{ zIndex: 1050 }}>
          <form onSubmit={handleSearch} className="d-flex me-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search stocks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="form-select me-2" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="construction">Construction</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
            </select>
            <button type="submit" className="btn btn-outline-light">
              <Search size={18} />
            </button>
          </form>
          {showSearchResults && (
            <SearchResults
              searchQuery={searchQuery}
              filterType={filterType}
              onResultClick={handleSearchResultClick}
              onClose={() => setShowSearchResults(false)}
              stocks={stocks}
              className="position-absolute top-100 start-0 w-100 mt-2"
            />
          )}
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
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
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
                <Link to="/all-trades" className="dropdown-item">
                  <User size={18} className="me-2" />
                  My Trades
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
                <button onClick={handleDeleteAccount} className="dropdown-item text-danger">
                  <Trash2 size={18} className="me-2" />
                  Delete Account
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button onClick={handleLogout} className="dropdown-item text-warning">
                  <LogOut size={18} className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

