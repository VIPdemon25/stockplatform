import React, { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const PortfolioTab = ({ onBack }) => {
  const [portfolio, setPortfolio] = useState(null)
  const [holdings, setHoldings] = useState([])

  // Dummy data for portfolio and holdings
  const dummyPortfolio = {
    value: 75000,
  }

  const dummyHoldings = [
    { name: "AAPL", value: 30000, percentage: 40 },
    { name: "GOOGL", value: 22500, percentage: 30 },
    { name: "AMZN", value: 15000, percentage: 20 },
    { name: "MSFT", value: 7500, percentage: 10 },
  ]

  // Fetch portfolio and holdings from API (commented out for now)
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   axios
  //     .get("http://localhost:9091/api/portfolio", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       setPortfolio(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching portfolio:", error);
  //     });

  //   axios
  //     .get("http://localhost:9091/api/holdings", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       setHoldings(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching holdings:", error);
  //     });
  // }, []);

  // Use dummy data for now
  useEffect(() => {
    setPortfolio(dummyPortfolio)
    setHoldings(dummyHoldings)
  }, [])

  if (!portfolio) {
    return (
      <div className="portfolio-tab">
        <h2 className="text-primary">No Portfolio Data</h2>
        <button className="btn btn-outline-primary" onClick={onBack}>
          <ArrowLeft size={18} className="me-2" /> Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="portfolio-tab animate__animated animate__fadeIn">
      <button className="btn btn-outline-primary mb-4" onClick={onBack}>
        <ArrowLeft size={18} className="me-2" /> Back to Dashboard
      </button>
      <h2 className="mb-4 text-primary">Portfolio</h2>
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
                    data={holdings}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {holdings.map((entry, index) => (
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
                {holdings.map((stock) => (
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
  )
}

export default PortfolioTab
