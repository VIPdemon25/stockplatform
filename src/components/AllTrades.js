import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign, Calendar, TrendingUp, TrendingDown, Clock, Tag } from "lucide-react";
import axios from "axios";

const AllTrades = () => {
  const [trades, setTrades] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tradesData;
        if (showAll) {
          // Fetch all trades using Axios
          // const response = await axios.get('/api/trades/all');
          tradesData = [
            {
              id: 1,
              symbol: "AAPL",
              type: "buy",
              amount: 1000,
              shares: 5,
              datetime: "2023-05-01T12:30:00",
              typeofPurchase: "positionSizing", // Can be "marketPlan" or "positionSizing"
              typeofSell: null, // Only for sell trades
              stopLoss: null, // Only for sell trades with typeofSell: "stopLoss"
            },
            {
              id: 2,
              symbol: "GOOGL",
              type: "sell",
              amount: 1500,
              shares: 2,
              datetime: "2023-05-02T09:00:00",
              typeofPurchase: null, // Only for buy trades
              typeofSell: "marketPlan", // Can be "marketPlan" or "stopLoss"
              stopLoss: "Percentage", // Ignored if typeofSell is "marketPlan"
            },
            {
              id: 3,
              symbol: "MSFT",
              type: "buy",
              amount: 800,
              shares: 3,
              datetime: "2023-05-03T15:45:00",
              typeofPurchase: "marketPlan", // Can be "marketPlan" or "positionSizing"
              typeofSell: null, // Only for sell trades
              stopLoss: null, // Only for sell trades with typeofSell: "stopLoss"
            },
            {
              id: 4,
              symbol: "AMZN",
              type: "sell",
              amount: 2000,
              shares: 1,
              datetime: "2023-05-04T10:10:00",
              typeofPurchase: null, // Only for buy trades
              typeofSell: "stopLoss", // Can be "marketPlan" or "stopLoss"
              stopLoss: "Value", // Only for sell trades with typeofSell: "stopLoss"
            },
          ];
        } else {
          // Fetch recent trades using Axios
          // const response = await axios.get('/api/trades/recent');
          tradesData = [
            {
              id: 3,
              symbol: "MSFT",
              type: "buy",
              amount: 800,
              shares: 3,
              datetime: "2023-05-03T15:45:00",
              typeofPurchase: "marketPlan", // Can be "marketPlan" or "positionSizing"
              typeofSell: "stopLoss", // Only for sell trades
              stopLoss: 5, // Only for sell trades with typeofSell: "stopLoss"
            },
            {
              id: 4,
              symbol: "AMZN",
              type: "sell",
              amount: 2000,
              shares: 1,
              datetime: "2023-05-04T10:10:00",
              typeofPurchase: null, // Only for buy trades
              typeofSell: "stopLoss", // Can be "marketPlan" or "stopLoss"
              stopLoss: "Value", // Only for sell trades with typeofSell: "stopLoss"
            },
          ];
        }
        setTrades(tradesData);
      } catch (error) {
        console.error("Error fetching trades:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    };

    fetchData();
  }, [showAll]);

  const getTradeTypeInfo = (trade) => {
    if (trade.type === "buy") {
      // For buy trades, check typeofPurchase
      return trade.typeofPurchase === "marketPlan" ? "Market Plan" : "Position Sizing";
    } else if (trade.type === "sell") {
      // For sell trades, check typeofSell
      return trade.typeofSell === "marketPlan" ? "Market Plan" : "Stop Loss";
    }
    return "Unknown";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Position Sizing":
        return "text-info";
      case "Stop Loss":
        return "text-warning";
      case "Market Plan":
        return "text-success";
      default:
        return "text-muted";
    }
  };

  return (
    <div className="all-trades animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/home" className="btn btn-primary mt-2">
          <ArrowLeft size={18} className="me-2" />
          Back to Home
        </Link>
        <h2 className="text-primary mb-0 me-3">All Trades</h2>
        <button className="btn btn-secondary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Recent" : "Show All"}
        </button>
      </div>
      <div className="card bg-dark">
        <div className="card-body">
          {trades.map((trade) => {
            const tradeType = getTradeTypeInfo(trade);
            return (
              <div
                key={trade.id}
                className="mb-3 p-3 rounded animate__animated animate__fadeInUp shadow-sm"
                style={{ backgroundColor: "rgba(74, 144, 226, 0.1)" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h5 className="mb-1 text-light">{trade.symbol}</h5>
                    <p className="mb-0 text-muted">
                      <Calendar size={14} className="me-1" />
                      {new Date(trade.datetime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-end">
                    <h5 className={`mb-1 ${trade.type === "buy" ? "text-success" : "text-danger"}`}>
                      {trade.type === "buy" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                      {trade.type.toUpperCase()}
                    </h5>
                    <p className="mb-0 text-light">
                      <DollarSign size={14} className="me-1" />
                      {trade.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 text-muted">
                    <Clock size={14} className="me-1" />
                    {new Date(trade.datetime).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                  <p className="mb-0 text-muted">Shares: {trade.shares}</p>
                  <p className="mb-0">
                    <Tag size={14} className="me-1" />
                    <span className={getTypeColor(tradeType)}>{tradeType}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllTrades;