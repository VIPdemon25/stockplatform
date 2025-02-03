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
    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const accountId = sessionStorage.getItem("accountId");

            // Fetch holdings
            const response = await axios.get(`http://localhost:7070/api/holdings/${accountId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedHoldings = response.data;

            // Map holdings to stocks and calculate values
            const updatedHoldings = fetchedHoldings.map((holding) => {
                const stock = stocks.find((stock) => stock.stockId === holding.stockId);
                const value = holding.numShares * (stock ? stock.open : 0);
                return {
                    ...holding,
                    name: stock ? stock.symbol : "Unknown",
                    value: value,
                };
            });

            const totalValue = updatedHoldings.reduce((sum, holding) => sum + holding.value, 0);
            const balance = {
              newBalance: totalValue
            }
            console.log(balance);
            
            // Patch holdings (or whatever action you intend)
            await axios.patch(`http://localhost:9091/api/portfolios/${accountId}/updatebalance`, balance);


            // Calculate the percentage for each holding
            const updatedHoldingsWithPercentage = updatedHoldings.map((holding) => ({
                ...holding,
                percentage: ((holding.value / totalValue) * 100).toFixed(2),
            }));

            setHoldings(updatedHoldingsWithPercentage);

            // Set portfolio value
            setPortfolio({ value: totalValue });
        } catch (error) {
            console.error("Error fetching or updating holdings:", error);
        }
    };

    fetchData();
}, [stocks]);

if (!portfolio) {
    return (
        <div className="portfolio-tab">
            <h2 className="text-primary">No Portfolio Data</h2>
            <button className="btn btn-outline-primary" onClick={onBack}>
                <ArrowLeft size={18} className="me-2" /> Back to Dashboard
            </button>
        </div>
    );
}


  if (!portfolio) {
    return (
      <div className="portfolio-tab">
        <h2 className="text-primary">No Portfolio Data</h2>
        <button className="btn btn-outline-primary" onClick={onBack}>
          <ArrowLeft size={18} className="me-2" /> Back to Dashboard
        </button>
      </div>
    );
  }

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
