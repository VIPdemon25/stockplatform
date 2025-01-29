import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashboardTab = ({ stockData }) => {
  // Dummy stock data (will be replaced with props later)
  const defaultStockData = [
    { stockId: 1, name: "Apple Inc.", symbol: "AAPL", type: "technology", open: 150.25, last: 151.5 },
    { stockId: 2, name: "Microsoft Corporation", symbol: "MSFT", type: "technology", open: 280.75, last: 282.0 },
    { stockId: 3, name: "Amazon.com, Inc.", symbol: "AMZN", type: "technology", open: 3380.0, last: 3395.5 },
    { stockId: 4, name: "Alphabet Inc.", symbol: "GOOGL", type: "technology", open: 2410.0, last: 2415.75 },
    { stockId: 5, name: "Tesla, Inc.", symbol: "TSLA", type: "technology", open: 690.5, last: 678.25 },
    { stockId: 6, name: "JPMorgan Chase & Co.", symbol: "JPM", type: "finance", open: 155.0, last: 156.75 },
    { stockId: 7, name: "Bank of America Corp", symbol: "BAC", type: "finance", open: 41.5, last: 41.75 },
    { stockId: 8, name: "Wells Fargo & Co", symbol: "WFC", type: "finance", open: 46.75, last: 46.25 },
    { stockId: 9, name: "Caterpillar Inc.", symbol: "CAT", type: "construction", open: 235.25, last: 239.0 },
    { stockId: 10, name: "Deere & Company", symbol: "DE", type: "construction", open: 355.0, last: 352.75 },
  ];

  // Use provided stock data or fallback to dummy data
  const stocks = stockData && stockData.length ? stockData : defaultStockData;

  // Function to get a random subset of 3 stocks
  const getRandomStocks = (stocks, count = 3) => {
    const shuffled = [...stocks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Function to generate random month labels
  const getRandomMonths = () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    .sort(() => 0.5 - Math.random()).slice(0, 7);

  // Function to generate random fluctuations for stock prices
  const getRandomPrice = (basePrice) => {
    return +(basePrice * (0.65 + Math.random() * 0.70)).toFixed(2); // Fluctuate within ±35% and round to 2 decimals
};




  // Memoized stock data to avoid recalculations on re-render
  const transformedStockData = useMemo(() => {
    const selectedStocks = getRandomStocks(stocks, 3);
    const months = getRandomMonths();

    return months.map((month) => {
      const dataPoint = { name: month };
      selectedStocks.forEach(stock => {
        dataPoint[stock.symbol] = getRandomPrice(Math.max(stock.open, stock.last));
      });
      return dataPoint;
    });
  }, [stocks]);

  return (
    <div className="dashboard animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Dashboard</h2>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Stock Performance</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transformedStockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                  <Legend />
                  {Object.keys(transformedStockData[0]).filter(key => key !== "name").map((stock, index) => (
                    <Line key={stock} type="monotone" dataKey={stock} stroke={["#8884d8", "#82ca9d", "#ffc658"][index]} />
                  ))}
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
    </div>
  );
};

export default DashboardTab;
