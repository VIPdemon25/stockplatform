import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Search,
  Plus,
  Settings,
  LogOut,
  Eye,
  DollarSign,
  Briefcase,
  TrendingUp,
  User,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Define COLORS array for PieChart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "Filter:", filterType);
  };

  const handleLogout = () => {
    // Clear user session (if applicable)
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    sessionStorage.removeItem("user"); // Example: Remove user data from sessionStorage

    // Redirect to the login page
    navigate("/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "trade":
        return <TradeTab />;
      case "portfolios":
        return selectedPortfolio ? (
          <PortfolioDetails portfolio={selectedPortfolio} onBack={() => setSelectedPortfolio(null)} />
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
                  <Link to="/account" className="dropdown-item">
                    <User size={18} className="me-2" />
                    Update Account
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut size={18} className="me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3 col-lg-2 mb-4">
            <div className="list-group">
              <button
                className={`list-group-item list-group-item-action ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <TrendingUp size={18} className="me-2" /> Dashboard
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "trade" ? "active" : ""}`}
                onClick={() => setActiveTab("trade")}
              >
                <DollarSign size={18} className="me-2" /> Trade
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "portfolios" ? "active" : ""}`}
                onClick={() => setActiveTab("portfolios")}
              >
                <Briefcase size={18} className="me-2" /> Portfolios
              </button>
              <button
                className={`list-group-item list-group-item-action ${activeTab === "watchlist" ? "active" : ""}`}
                onClick={() => setActiveTab("watchlist")}
              >
                <Eye size={18} className="me-2" /> Watchlist
              </button>
            </div>
          </div>
          <div className="col-md-9 col-lg-10">
            <div className="card bg-dark border-0">
              <div className="card-body">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DashboardTab Component
const DashboardTab = () => {
  const stockData = [
    { name: "Jan", AAPL: 4000, GOOGL: 2400, AMZN: 2400 },
    { name: "Feb", AAPL: 3000, GOOGL: 1398, AMZN: 2210 },
    { name: "Mar", AAPL: 2000, GOOGL: 9800, AMZN: 2290 },
    { name: "Apr", AAPL: 2780, GOOGL: 3908, AMZN: 2000 },
    { name: "May", AAPL: 1890, GOOGL: 4800, AMZN: 2181 },
    { name: "Jun", AAPL: 2390, GOOGL: 3800, AMZN: 2500 },
    { name: "Jul", AAPL: 3490, GOOGL: 4300, AMZN: 2100 },
  ];

  return (
    <div className="dashboard animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Dashboard</h2>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Stock Performance</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                  <Line type="monotone" dataKey="AAPL" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="GOOGL" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="AMZN" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-gradient-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Portfolio Summary</h5>
              <p className="mb-0">Total Value: $100,000</p>
              <p className="mb-0">Today's Gain/Loss: +$1,500 (+1.5%)</p>
            </div>
          </div>
          <div className="card bg-dark mt-4">
            <div className="card-body">
              <h5 className="card-title text-primary">Latest Market News</h5>
              <ul className="list-unstyled text-light">
                <li className="mb-2">Tech stocks surge on positive earnings reports</li>
                <li className="mb-2">Oil prices stabilize after recent volatility</li>
                <li className="mb-2">Federal Reserve hints at potential rate hike</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Top Gainers</h5>
              <ul className="list-unstyled text-light">
                <li>
                  AAPL - Apple Inc. <span className="text-success">+2.5%</span>
                </li>
                <li>
                  GOOGL - Alphabet Inc. <span className="text-success">+1.8%</span>
                </li>
                <li>
                  AMZN - Amazon.com Inc. <span className="text-success">+1.2%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Top Losers</h5>
              <ul className="list-unstyled text-light">
                <li>
                  FB - Facebook Inc. <span className="text-danger">-1.5%</span>
                </li>
                <li>
                  TSLA - Tesla Inc. <span className="text-danger">-0.8%</span>
                </li>
                <li>
                  NFLX - Netflix Inc. <span className="text-danger">-0.6%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TradeTab Component
const TradeTab = () => {
  const [tradeType, setTradeType] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [useRiskManagement, setUseRiskManagement] = useState(false);
  const [positionSize, setPositionSize] = useState("");
  const [stopLoss, setStopLoss] = useState("");

  const handleTrade = (e) => {
    e.preventDefault();
    console.log("Trade:", { tradeType, symbol, quantity, price, useRiskManagement, positionSize, stopLoss });
  };

  return (
    <div className="trade animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Trade</h2>
      <form onSubmit={handleTrade}>
        <div className="mb-3">
          <div className="btn-group" role="group">
            <input
              type="radio"
              className="btn-check"
              name="tradeType"
              id="buyOption"
              value="buy"
              checked={tradeType === "buy"}
              onChange={(e) => setTradeType(e.target.value)}
            />
            <label className="btn btn-outline-primary" htmlFor="buyOption">
              Buy
            </label>
            <input
              type="radio"
              className="btn-check"
              name="tradeType"
              id="sellOption"
              value="sell"
              checked={tradeType === "sell"}
              onChange={(e) => setTradeType(e.target.value)}
            />
            <label className="btn btn-outline-primary" htmlFor="sellOption">
              Sell
            </label>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="useRiskManagement"
            checked={useRiskManagement}
            onChange={(e) => setUseRiskManagement(e.target.checked)}
          />
          <label className="form-check-label text-light" htmlFor="useRiskManagement">
            Use Risk Management
          </label>
        </div>
        {useRiskManagement && (
          <>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Position Sizing (%)"
                value={positionSize}
                onChange={(e) => setPositionSize(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Stop Loss"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
    </div>
  );
};

// PortfoliosTab Component
const PortfoliosTab = ({ onSelectPortfolio }) => {
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: "Main Portfolio", value: 75000 },
    { id: 2, name: "Tech Stocks", value: 25000 },
  ]);

  const [newPortfolioName, setNewPortfolioName] = useState("");

  const handleCreatePortfolio = (e) => {
    e.preventDefault();
    if (newPortfolioName) {
      setPortfolios([...portfolios, { id: portfolios.length + 1, name: newPortfolioName, value: 0 }]);
      setNewPortfolioName("");
    }
  };

  return (
    <div className="portfolios animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Portfolios</h2>
      <div className="row">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="col-md-4 mb-4">
            <div className="card bg-gradient-info text-white">
              <div className="card-body">
                <h5 className="card-title">{portfolio.name}</h5>
                <p className="card-text">Value: ${portfolio.value.toLocaleString()}</p>
                <button className="btn btn-light btn-sm" onClick={() => onSelectPortfolio(portfolio)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreatePortfolio} className="mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="New Portfolio Name"
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} className="me-2" /> Create Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

// PortfolioDetails Component
const PortfolioDetails = ({ portfolio, onBack }) => {
  const stockData = [
    { name: "AAPL", value: 30000, percentage: 40 },
    { name: "GOOGL", value: 22500, percentage: 30 },
    { name: "AMZN", value: 15000, percentage: 20 },
    { name: "MSFT", value: 7500, percentage: 10 },
  ];

  return (
    <div className="portfolio-details animate__animated animate__fadeIn">
      <button className="btn btn-outline-primary mb-4" onClick={onBack}>
        <ArrowLeft size={18} className="me-2" /> Back to Portfolios
      </button>
      <h2 className="mb-4 text-primary">{portfolio.name}</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Portfolio Value</h5>
              <p className="display-4 text-light">${portfolio.value.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Asset Allocation</h5>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stockData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-dark">
        <div className="card-body">
          <h5 className="card-title text-primary">Holdings</h5>
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Value</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((stock) => (
                  <tr key={stock.name}>
                    <td>{stock.name}</td>
                    <td>${stock.value.toLocaleString()}</td>
                    <td>{stock.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// WatchlistTab Component
const WatchlistTab = () => {
  const [watchlist, setWatchlist] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 280.75, change: -1.2 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.0, change: 0.8 },
  ]);

  const [newSymbol, setNewSymbol] = useState("");

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    if (newSymbol) {
      setWatchlist([...watchlist, { symbol: newSymbol, name: "New Stock", price: 0, change: 0 }]);
      setNewSymbol("");
    }
  };

  return (
    <div className="watchlist animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Watchlist</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td className={stock.change >= 0 ? "text-success" : "text-danger"}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleAddToWatchlist} className="mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add Stock Symbol"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} className="me-2" /> Add to Watchlist
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;