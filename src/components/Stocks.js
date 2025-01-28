import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ArrowUp, ArrowDown } from "lucide-react"

const Stocks = ({stocks}) => {
  // const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState(null)
  const location = useLocation()

  // Dummy data for testing (update with the new fields)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const stockId = params.get("id")
    if (stockId) {
      const stock = stocks.find((s) => s.stockId === Number.parseInt(stockId))
      setSelectedStock(stock)
    } else {
      setSelectedStock(null)
    }
  }, [location.search, stocks]);
  

  const renderStockCard = (stock) => {
    const priceChange = stock.last - stock.open
    const priceChangePercent = (priceChange / stock.open) * 100
    const isPositive = priceChange >= 0

    return (
      <div key={stock.stockId} className="col-md-4 mb-4">
        <div className="card bg-dark border-primary h-100">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-primary">{stock.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{stock.symbol}</h6>
            <div className="mt-auto">
              <p className="card-text mb-0">
                <span className="text-muted">Open:</span> <span className="text-light">${stock.open.toFixed(2)}</span>
              </p>
              <p className="card-text mb-0">
                <span className="text-muted">Last:</span> <span className="text-light">${stock.last.toFixed(2)}</span>
              </p>
              <p className={`card-text ${isPositive ? "text-success" : "text-danger"}`}>
                {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}${Math.abs(priceChange).toFixed(2)} (
                {priceChangePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStockList = () => <div className="row">{stocks.map(renderStockCard)}</div>

  const renderSelectedStock = () => renderStockCard(selectedStock)

  return (
    <div className="stocks animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Stocks</h2>
      {selectedStock ? renderSelectedStock() : renderStockList()}
    </div>
  )
}

export default Stocks

