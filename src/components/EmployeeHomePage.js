import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, PlusCircle, Sliders, Edit, Trash2, Activity, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCompany from "./CreateCompany";
import UpdateCompany from "./UpdateCompany";

const EmployeeHomePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showStockManagement, setShowStockManagement] = useState(false);
  const [stocks, setStocks] = useState([
    // Dummy stocks for testing
    {
      id: 1,
      name: "Apple Inc.",
      symbol: "AAPL",
      currentPrice: 150.25,
      change24h: 1.5,
      totalShares: 1000000,
      type: "Public",
    },
    {
      id: 2,
      name: "Google LLC",
      symbol: "GOOGL",
      currentPrice: 2800.5,
      change24h: -0.75,
      totalShares: 500000,
      type: "Public",
    },
    {
      id: 3,
      name: "Tesla Inc.",
      symbol: "TSLA",
      currentPrice: 750.0,
      change24h: 2.3,
      totalShares: 750000,
      type: "Public",
    },
    {
      id: 4,
      name: "Amazon.com Inc.",
      symbol: "AMZN",
      currentPrice: 3400.0,
      change24h: -1.2,
      totalShares: 300000,
      type: "Public",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
    if (showStockManagement) fetchStocks();
  }, [showStockManagement]);

  useEffect(() => {
    const filtered = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [searchTerm, stocks]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get("/api/stocks");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleStockSubmit = async (newStock) => {
    try {
      await axios.post("/api/stocks", newStock);
      fetchStocks();
    } catch (error) {
      console.error("Error registering new stock:", error);
    }
  };

  const deleteStock = async (stockId) => {
    try {
      await axios.delete(`/api/stocks/${stockId}`);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleUpdateStock = async (updatedStock) => {
    try {
      await axios.put(`/api/stocks/${updatedStock.id}`, updatedStock);
      fetchStocks();
      setSelectedStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="employee-home container-fluid bg-dark text-light">
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-primary">Employee Dashboard</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <LogOut size={18} className="me-2" />
              Logout
            </button>
          </div>

          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-dark border-primary">
                <div className="card-body d-flex justify-content-around">
                  <button className="btn btn-outline-primary">
                    <PlusCircle size={18} className="me-2" />
                    Add New User
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => setShowStockManagement(!showStockManagement)}
                  >
                    <Sliders size={18} className="me-2" />
                    {showStockManagement ? "Back to Dashboard" : "Manage Stocks"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showStockManagement ? (
            <div className="card bg-dark border-primary">
              <div className="card-body">
                <h5 className="card-title text-success mb-4">
                  <Sliders size={20} className="me-2" />
                  Stock Management
                </h5>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-primary">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-primary"
                      placeholder="Search stocks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Stock ID</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Current Price</th>
                        <th>24h Change</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStocks.map((stock) => (
                        <tr key={stock.id}>
                          <td>{stock.id}</td>
                          <td>{stock.name}</td>
                          <td>{stock.symbol}</td>
                          <td>${stock.currentPrice}</td>
                          <td className={stock.change24h >= 0 ? "text-success" : "text-danger"}>
                            {stock.change24h}%
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-warning me-2"
                              onClick={() => setSelectedStock(stock)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteStock(stock.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="card bg-dark border-primary">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <Users size={20} className="me-2" />
                  User Management
                </h5>
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((user) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.accountType}</td>
                          <td>
                            <span className={`badge ${user.active ? "bg-success" : "bg-danger"}`}>
                              {user.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-info me-2">Edit</button>
                            <button className="btn btn-sm btn-outline-warning">Reset Pass</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-4">
          <CreateCompany onStockSubmit={handleStockSubmit} />

          <div className="card bg-dark border-primary">
            <div className="card-body">
              <h5 className="card-title text-info">
                <Activity size={20} className="me-2" />
                Real-time Transactions
              </h5>
              <div className="transaction-list">
                {transactions.map((transaction, index) => (
                  <div key={index} className="transaction-item mb-3 p-2 bg-dark-secondary rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className={`badge ${transaction.type === "buy" ? "bg-success" : "bg-danger"}`}>
                          {transaction.type.toUpperCase()}
                        </span>
                        <span className="ms-2 text-light">{transaction.stockName}</span>
                      </div>
                      <div className="text-end">
                        <div className="text-light">
                          {transaction.amount} @ ${transaction.price}
                        </div>
                        <div className="text-muted small">
                          {new Date(transaction.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedStock && (
        <UpdateCompany stock={selectedStock} onUpdate={handleUpdateStock} onCancel={() => setSelectedStock(null)} />
      )}
    </div>
  );
};

export default EmployeeHomePage;