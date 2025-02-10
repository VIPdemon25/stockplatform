import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";// used to create pie chart
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];//set of colors used for the pie chart 

const PortfolioTab = ({ onBack, stocks }) => {
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);

  // here useEffect fetches and processes portfolio data, calculates values and percentages, and updates a balance. 
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

            
            const updatedHoldings = fetchedHoldings.map((holding) => {//The .map() function creates a new list (updatedHoldings) with the updated information
                const stock = stocks.find((stock) => stock.stockId === holding.stockId);// find the details of a specific stock within a list of available stocks.
                const value = holding.numShares * (stock ? stock.open : 0);// here we are calculates the total value of the holding
                return {// here we r creates a new object based on the information it has gathered
                    ...holding,// spread operator to copy the existing holding object into a new one 
                    name: stock ? stock.symbol : "Unknown",
                    value: value,
                };
            });
            const filteredHoldings = updatedHoldings.filter(holding => holding.numShares > 0);//it filters out any holdings with zero shares
            const totalValue = filteredHoldings.reduce((sum, holding) => sum + holding.value, 0);//it calculates the total value of the portfolio
            const balance = {
              newBalance: totalValue
            }
            console.log(balance);
            
           //this will update the balance in the database
            await axios.patch(`http://localhost:9091/api/portfolios/${accountId}/updatebalance`, balance);


            // Calculate the percentage for each holding
            const updatedHoldingsWithPercentage = filteredHoldings.map((holding) => ({//it calculates the percentage of the total value that each holding represents
                ...holding,
                percentage: ((holding.value / totalValue) * 100).toFixed(2),
            }));

            setHoldings(updatedHoldingsWithPercentage);

            //it updates the portfolio state with the total value of the portfolio
            setPortfolio({ value: totalValue });
        } catch (error) {
            console.error("Error fetching or updating holdings:", error);
        }
    };

    fetchData();
}, [stocks]);// here whenever the stock prop changes the useEffect will run again

if (!portfolio) {// if there is no portfolio data, the component will render a message to the user
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
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-dark">
            <div className="card-body">
              <h5 className="card-title text-primary">Portfolio Value</h5>
              <p className="display-4 text-light">${portfolio.value.toLocaleString()}</p>// 
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />// here we are creating a cell for each holding in the portfolio
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
                  <th>Number of Shares</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.holdingId}>
                    <td>{holding.name}</td>
                    <td>${holding.value.toLocaleString()}</td>
                    <td>{holding.percentage}%</td>
                    <td>{holding.numShares}</td>
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