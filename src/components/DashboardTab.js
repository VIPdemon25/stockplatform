import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const DashboardTab = () => {
  const stockData = [
    { name: "Jan", AAPL: 4000, GOOGL: 2400, AMZN: 2400 },
    { name: "Feb", AAPL: 3000, GOOGL: 1398, AMZN: 2210 },
    { name: "Mar", AAPL: 2000, GOOGL: 9800, AMZN: 2290 },
    { name: "Apr", AAPL: 2780, GOOGL: 3908, AMZN: 2000 },
    { name: "May", AAPL: 1890, GOOGL: 4800, AMZN: 2181 },
    { name: "Jun", AAPL: 2390, GOOGL: 3800, AMZN: 2500 },
    { name: "Jul", AAPL: 3490, GOOGL: 4300, AMZN: 2100 },
  ]

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
                  <Legend />
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
  )
}

export default DashboardTab

