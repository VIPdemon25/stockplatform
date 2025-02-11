import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";



const DashboardTab = ({ stocks }) => {
  // Passing stock data as a prop (defaulting to dummy data)
  const [selectedStocks, setSelectedStocks] = useState([]);// State to store the selected stocks
  const [stockData, setStockData] = useState([]);// State to store the stock data
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [accountName, setAccountName] = useState("John Doe"); // Dummy account name for now

  const getRandomPrice = (basePrice) => {// basicall this function is used to generate random price of stock between 65% to 135% of the base price
    return +(basePrice * (0.65 + Math.random() * 0.7)).toFixed(2);
  };

  const getDistinctColor = (index) => {
    const colors = ["#FF0000", "#00FF00", "#b507b5"]; // Red, Green, Purple
    return colors[index % colors.length]; // Cycle through the three colors
  };

  useEffect(() => {// Fetch account details on component mount
    // Commenting out fetching logic for now
    const token = sessionStorage.getItem("token");
    const accountId = sessionStorage.getItem("accountId");
    axios
      .get(`http://localhost:9091/api/stocktrader/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      }) // Replace with your actual endpoint
      .then((response) => {
        setAccountName(response.data.fname); // Assuming accountName is part of the response
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });

    // Randomly select 3 stocks for the graph from the passed stocks prop
    const shuffledStocks = [...stocks].sort(() => 0.5 - Math.random());
    const chosenStocks = shuffledStocks.slice(0, 3);

    // Generate monthly data for all stocks with fluctuating prices
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // Generate random prices for each stock for each month
    const generatedData = months.map((month) => {
      let entry = { name: month };
      
      stocks.forEach((stock) => {
        entry[stock.symbol] = getRandomPrice(Math.max(stock.open, stock.last));
      });
      return entry;
    });

    setSelectedStocks(chosenStocks);
    setStockData(generatedData);



    // Determine gainers and losers (based on all generatedData, not just the selected ones)
    const stockChanges = stocks.map((stock) => {
      const firstPrice = generatedData[0][stock.symbol];
      const lastPrice = generatedData[generatedData.length - 1][stock.symbol];
      const changePercent = (
        ((lastPrice - firstPrice) / firstPrice) *
        100
      ).toFixed(2);
      return { symbol: stock.symbol, name: stock.name, change: changePercent };
    });

    // Sort by gainers and losers based on the change of stock pice over the month
    const sortedChanges = [...stockChanges].sort((a, b) => b.change - a.change);
    setGainers(sortedChanges.slice(0, 3));
    setLosers(sortedChanges.slice(-3));
  }, [stocks]); // Add stocks as a dependency in case props change

  return (
    <div className="dashboard animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Dashboard</h2>
      {/* Displaying the welcome message with account name */}
      <div className="welcome-message text-light mb-4">
        <h4>Welcome, {accountName}</h4>
      </div>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Stock Performance</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={stockData}
                  animationDuration={3000}
                  animationEasing="ease-in-out"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Legend />
                  {selectedStocks.map((stock, index) => (
                    <Line
                      key={stock.symbol}
                      type="monotone"
                      dataKey={stock.symbol}
                      stroke={getDistinctColor(index)}
                      activeDot={{ r: 8 }}
                      isAnimationActive={true}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-dark mt-4">
            <div className="card-body">
              <h5 className="card-title text-primary">Latest Market News</h5>
              <ul className="list-unstyled text-light">
                <li className="mb-2">
                  Tech stocks surge on positive earnings reports
                </li>
                <li className="mb-2">
                  Oil prices stabilize after recent volatility
                </li>
                <li className="mb-2">
                  Federal Reserve hints at potential rate hike
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Gainers & Losers */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Top Gainers</h5>
              <ul className="list-unstyled text-light">
                {gainers.map((stock) => (
                  <li key={stock.symbol}>
                    {stock.symbol} - {stock.name}{" "}
                    <span className="text-success">+{stock.change}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Top Losers</h5>
              <ul className="list-unstyled text-light">
                {losers.map((stock) => (
                  <li key={stock.symbol}>
                    {stock.symbol} - {stock.name}{" "}
                    <span className="text-danger">{stock.change}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
