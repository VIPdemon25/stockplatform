import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, PlusCircle, Sliders, DollarSign, Edit, Trash2, Activity, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const EmployeeHomePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [newStock, setNewStock] = useState({ id: "", name: "", entryPrice: "" });
  const [transactions, setTransactions] = useState([]);
  const [showStockManagement, setShowStockManagement] = useState(false);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
    if (showStockManagement) fetchStocks();
  }, [showStockManagement]);

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

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/stocks", newStock);
      setNewStock({ id: "", name: "", entryPrice: "" });
      fetchTransactions();
      if (showStockManagement) fetchStocks();
    } catch (error) {
      console.error("Error registering new stock:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const deleteStock = async (stockId) => {
    try {
      await axios.delete(`/api/stocks/${stockId}`);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear any user session or token (if applicable)
    localStorage.removeItem("authToken"); // Example: Remove token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="employee-home container-fluid bg-dark text-light">
      <div className="row">
        <div className="col-md-8">
          {/* Header with Logout Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-primary">Employee Dashboard</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <LogOut size={18} className="me-2" />
              Logout
            </button>
          </div>

          {/* Quick Actions Row */}
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

          {/* Rest of the code remains unchanged */}
          {showStockManagement ? (
            /* Stock Management Component */
            <div className="card bg-dark border-primary">
              <div className="card-body">
                <h5 className="card-title text-success mb-4">
                  <Sliders size={20} className="me-2" />
                  Stock Management
                </h5>
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
                      {stocks.map((stock) => (
                        <tr key={stock.id}>
                          <td>{stock.id}</td>
                          <td>{stock.name}</td>
                          <td>{stock.symbol}</td>
                          <td>${stock.currentPrice}</td>
                          <td className={stock.change24h >= 0 ? "text-success" : "text-danger"}>
                            {stock.change24h}%
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-warning me-2">
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
            /* User Management */
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
                            <button className="btn btn-sm btn-outline-info me-2">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-warning">
                              Reset Pass
                            </button>
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

        {/* Right Sidebar */}
        <div className="col-md-4">
          {/* Quick Stock Registration */}
          <div className="card bg-dark border-primary mb-4">
            <div className="card-body">
              <h5 className="card-title text-primary">
                <PlusCircle size={20} className="me-2" />
                New Stock Registration
              </h5>
              <form onSubmit={handleStockSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-primary"
                    placeholder="Stock ID"
                    name="id"
                    value={newStock.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-primary"
                    placeholder="Stock Name"
                    name="name"
                    value={newStock.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control bg-dark text-light border-primary"
                    placeholder="Entry Price"
                    name="entryPrice"
                    value={newStock.entryPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register Stock
                </button>
              </form>
            </div>
          </div>

          {/* Real-time Transactions */}
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
    </div>
  );
};

export default EmployeeHomePage;