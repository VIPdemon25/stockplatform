import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Eye, DollarSign, Briefcase, TrendingUp } from "lucide-react";

import Navbar from "./Navbar";
import DashboardTab from "./DashboardTab";
import TradeTab from "./TradeTab";
import PortfoliosTab from "./PortfoliosTab";
import PortfolioDetails from "./PortfolioDetails";
import WatchlistTab from "./WatchlistTab";
import UpdateAccount from "./UpdateAccount";
import AccountDetails from "./AccountDetails";
import axios from "axios";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "Filter:", filterType);
  };

  const handleLogout = () => {
    const accountId = sessionStorage.getItem("accountId");

    if (accountId) {
        axios.post(`http://localhost:9091/v1/logout/${accountId}`)
            .then(response => {
                console.log('Logout successful:', response.data);
                
                // Remove items from session storage
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("accountId");
                
                // Navigate to login page
                navigate("/login");
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    } else {
        console.error('No account ID found in session storage');
    }
};

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "trade":
        return <TradeTab />;
      case "portfolios":
        return selectedPortfolio ? (
          <PortfolioDetails
            portfolio={selectedPortfolio}
            onBack={() => setSelectedPortfolio(null)}
          />
        ) : (
          <PortfoliosTab onSelectPortfolio={setSelectedPortfolio} />
        );
      case "watchlist":
        return <WatchlistTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="homepage bg-dark text-light min-vh-100">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
      />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3 col-lg-2 mb-4">
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <TrendingUp size={18} className="me-2" /> Dashboard
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "trade" ? "active" : ""
                }`}
                onClick={() => setActiveTab("trade")}
              >
                <DollarSign size={18} className="me-2" /> Trade
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "portfolios" ? "active" : ""
                }`}
                onClick={() => setActiveTab("portfolios")}
              >
                <Briefcase size={18} className="me-2" /> Portfolios
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "watchlist" ? "active" : ""
                }`}
                onClick={() => setActiveTab("watchlist")}
              >
                <Eye size={18} className="me-2" /> Watchlist
              </button>
            </div>
          </div>
          <div className="col-md-9 col-lg-10">
            <div className="card bg-dark border-0">
              <div className="card-body">
                <Routes>
                  {/* Catch-all route for other tabs */}
                  <Route path="*" element={renderTabContent()} />
                  <Route path="/update-account" element={<UpdateAccount />} />
                  <Route path="/account-details" element={<AccountDetails />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
