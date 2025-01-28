import React, { useState } from "react"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PortfoliosTab = ({ onSelectPortfolio }) => {
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: "Main Portfolio", value: 75000 },
    { id: 2, name: "Tech Stocks", value: 25000 },
  ])

  const [newPortfolioName, setNewPortfolioName] = useState("")
  const navigate = useNavigate()

  const handleCreatePortfolio = (e) => {
    e.preventDefault()
    if (newPortfolioName) {
      setPortfolios([...portfolios, { id: portfolios.length + 1, name: newPortfolioName, value: 0 }])
      setNewPortfolioName("")
    }
  }

  const handlePortfolioSelect = (portfolio) => {
    // Select portfolio and navigate to its details page
    onSelectPortfolio(portfolio)
    navigate(`/home/portfolios/${portfolio.id}`)
  }

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
                <button className="btn btn-light btn-sm" onClick={() => handlePortfolioSelect(portfolio)}>
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
  )
}

export default PortfoliosTab
