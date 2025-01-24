import React, { useState } from "react"
import { Plus } from "lucide-react"

const WatchlistTab = () => {
  const [watchlist, setWatchlist] = useState([
    { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 280.75, change: -1.2 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.0, change: 0.8 },
  ])

  const [newSymbol, setNewSymbol] = useState("")

  const handleAddToWatchlist = (e) => {
    e.preventDefault()
    if (newSymbol) {
      setWatchlist([...watchlist, { symbol: newSymbol, name: "New Stock", price: 0, change: 0 }])
      setNewSymbol("")
    }
  }

  return (
    <div className="watchlist animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Watchlist</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td className={stock.change >= 0 ? "text-success" : "text-danger"}>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleAddToWatchlist} className="mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add Stock Symbol"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} className="me-2" /> Add to Watchlist
          </button>
        </div>
      </form>
    </div>
  )
}

export default WatchlistTab

