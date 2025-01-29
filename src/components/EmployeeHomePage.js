import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  PlusCircle,
  Sliders,
  Edit,
  Trash2,
  Activity,
  LogOut,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCompany from "./CreateCompany";
import UpdateCompany from "./UpdateCompany";

const EmployeeHomePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showStockManagement, setShowStockManagement] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); 
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const[searchUserTerm, setSearchUserTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
    if (showStockManagement) fetchStocks();
  }, [showStockManagement]);

  useEffect(() => {
    const filtered = accounts.filter(
      (account) =>
        account.fname.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
        account.lname.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchUserTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  },[searchUserTerm, accounts]);

  useEffect(() => {
    const filtered = stocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [searchTerm, stocks]);

  const fetchAccounts = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:9091/api/stocktrader`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      // const dummy = [
      //   {
      //     id: 1,
      //     fname: "John",
      //     lname: "Doe",
      //     email: "johndoe@example.com",
      //     status: true,
      //   },
      //   {
      //     id: 2,
      //     fname: "Jane",
      //     lname: "Smith",
      //     email: "janesmith@example.com",
      //     status: false,
      //   },
      // ];
      // setAccounts(dummy);

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
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:9091/api/stocks`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  // const handleStockSubmit = async (newStock) => {
  //   try {
  //     await axios.post("/api/stocks", newStock);
  //     fetchStocks();
  //   } catch (error) {
  //     console.error("Error registering new stock:", error);
  //   }
  // };

  const deleteStock = async (stockId) => {
    const token = sessionStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:9091/api/stocks/${stockId}/delete`,{
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });
      
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const handleUpdateStock = async (updatedStock) => {
    const token = sessionStorage.getItem("token");
    const stockId = selectedStock.stockId;
    console.log(selectedStock);
    const backendPayLoad = {
      stockId: selectedStock.stockId,
      name: updatedStock.name,
      symbol: updatedStock.symbol,
      open: updatedStock.open,
      last: updatedStock.last,
      totalShares: updatedStock.totalShares,
    };
    console.log(backendPayLoad);
    setIsUpdating(true);
    try {
      await axios.put(
        `http://localhost:9091/api/stocks/companies/${stockId}/update`,
        backendPayLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );
      fetchStocks();
      setSelectedStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    } finally{
      setIsUpdating(false);
    }
  };

  // const handleLogout = async () => {
  //   const accountId = sessionStorage.getItem("accountId");
  //   try{
  //   const response = await axios.post(`http://localhost:9091/v1/logout/${accountId}`);
  //   console.log(response);
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("accountId");
  //   navigate("/login");
  //   }catch (error) {
  //     console.error('Logout failed:', error);
  // }
    
  // };
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
                    {showStockManagement
                      ? "Back to Dashboard"
                      : "Manage Stocks"}
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
                        <th>Last Price</th>
                        <th>Total Shares</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStocks.map((stock) => (
                        <tr key={stock.id}>
                          <td>{stock.stockId}</td>
                          <td>{stock.name}</td>
                          <td>{stock.symbol}</td>
                          <td>{stock.open}</td>
                          <td>{stock.last}</td>
                          <td>{stock.totalShares}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-warning me-2"
                              onClick={() => setSelectedStock(stock)}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteStock(stock.stockId)}
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
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-primary">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-primary"
                      placeholder="Search users..."
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((user) => (
                        <tr key={user.id}>
                          <td>{user.fname}</td>
                          <td>{user.lname}</td>
                          <td>{user.email}</td>
                          {/* <td>{user.status}</td> */}
                          <td>
                            <span
                              className={`badge ${
                                user.status ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {user.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          {/* <td>
                            <button className="btn btn-sm btn-outline-info me-2">Edit</button>
                            <button className="btn btn-sm btn-outline-warning">Reset Pass</button>
                          </td> */}
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
          <CreateCompany fetchStocks={fetchStocks} />

          <div className="card bg-dark border-primary">
            <div className="card-body">
              <h5 className="card-title text-info">
                <Activity size={20} className="me-2" />
                Real-time Transactions
              </h5>
              <div className="transaction-list">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="transaction-item mb-3 p-2 bg-dark-secondary rounded"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span
                          className={`badge ${
                            transaction.type === "buy"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {transaction.type.toUpperCase()}
                        </span>
                        <span className="ms-2 text-light">
                          {transaction.stockName}
                        </span>
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
        <UpdateCompany
          stock={selectedStock}
          onUpdate={handleUpdateStock}
          onCancel={() => setSelectedStock(null)}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default EmployeeHomePage;
