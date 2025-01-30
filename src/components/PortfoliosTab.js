import React, { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PortfolioTab = ({ onBack, stocks }) => {
  const [portfolios, setPortfolios] = useState([{ id: 1, name: "Portfolio 1", holdings: [] }]);
  const [activePortfolioId, setActivePortfolioId] = useState(1);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchHoldings();
  }, [activePortfolioId, stocks]);

  const fetchHoldings = async () => {
    const token = sessionStorage.getItem("token");
    const accountId = sessionStorage.getItem("accountId");
    try {
      const response = await axios.get(`http://localhost:7070/api/holdings/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedHoldings = response.data;

      // Get holdings from all other portfolios
      const otherHoldings = portfolios
        .filter((p) => p.id !== activePortfolioId)
        .flatMap((p) => p.holdings.map((h) => h.holdingId));

      // Filter out holdings already in other portfolios
      const newHoldings = fetchedHoldings.filter((h) => !otherHoldings.includes(h.holdingId));

      // Map holdings to stocks
      const updatedHoldings = newHoldings.map((holding) => {
        const stock = stocks.find((stock) => stock.stockId === holding.stockId);
        return {
          ...holding,
          name: stock ? stock.symbol : "Unknown",
          value: holding.boughtAt,
        };
      });

      const totalValue = updatedHoldings.reduce((sum, h) => sum + h.value, 0);
      const updatedHoldingsWithPercentage = updatedHoldings.map((h) => ({
        ...h,
        percentage: totalValue ? ((h.value / totalValue) * 100).toFixed(2) : 0,
      }));

      setHoldings(updatedHoldingsWithPercentage);
      updatePortfolioHoldings(activePortfolioId, updatedHoldingsWithPercentage);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  const updatePortfolioHoldings = (portfolioId, newHoldings) => {
    setPortfolios((prevPortfolios) =>
      prevPortfolios.map((p) => (p.id === portfolioId ? { ...p, holdings: newHoldings } : p))
    );
  };

  const addPortfolio = () => {
    const newPortfolio = { id: portfolios.length + 1, name: `Portfolio ${portfolios.length + 1}`, holdings: [] };
    setPortfolios([...portfolios, newPortfolio]);
    setActivePortfolioId(newPortfolio.id);
    setHoldings([]); // New portfolio starts empty
  };

  return (
    <div className="portfolio-tab animate__animated animate__fadeIn">
      <button className="btn btn-outline-primary mb-4" onClick={onBack}>
        <ArrowLeft size={18} className="me-2" /> Back to Dashboard
      </button>
      <h2 className="mb-4 text-primary">Portfolio</h2>
      <div className="mb-3">
        {portfolios.map((portfolio) => (
          <button
            key={portfolio.id}
            className={`btn me-2 ${portfolio.id === activePortfolioId ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setActivePortfolioId(portfolio.id);
              setHoldings(portfolio.holdings);
            }}
          >
            {portfolio.name}
          </button>
        ))}
        <button className="btn btn-success" onClick={addPortfolio}>
          <Plus size={18} className="me-2" /> Add Portfolio
        </button>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Portfolio Value</h5>
              <p className="display-4 text-light">${holdings.reduce((sum, h) => sum + h.value, 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Asset Allocation</h5>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={holdings} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
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
                {holdings.map((holding) => (
                  <tr key={holding.holdingId}>
                    <td>{holding.name}</td>
                    <td>${holding.value.toLocaleString()}</td>
                    <td>{holding.percentage}%</td>
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

export default PortfolioTab;
