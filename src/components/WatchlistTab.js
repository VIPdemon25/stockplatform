import React, { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";

const WatchlistTab = ({ stocks }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to get current user ID from session storage
  const getCurrentUserID = () => {
    return sessionStorage.getItem("accountId");
  };

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const currentUserID = getCurrentUserID();
    if (currentUserID) {
      const storedUserWatchlist = localStorage.getItem(`watchlist_${currentUserID}`);
      if (storedUserWatchlist) {
        setWatchlist(JSON.parse(storedUserWatchlist));
        console.log(`Loaded watchlist for user ${currentUserID} from localStorage:`, JSON.parse(storedUserWatchlist));
      }
      setIsLoaded(true);
    }
  }, []);

  // Save watchlist to localStorage, but only after the initial load
  useEffect(() => {
    const currentUserID = getCurrentUserID();
    if (isLoaded && currentUserID) {
      localStorage.setItem(`watchlist_${currentUserID}`, JSON.stringify(watchlist));
      console.log(`Saved watchlist for user ${currentUserID} to localStorage:`, watchlist);
    }
  }, [watchlist, isLoaded]);

  const handleAddToWatchlist = (symbol) => {
    if (watchlist.some((stock) => stock.symbol === symbol)) {
      return;
    }

    const stock = stocks.find((s) => s.symbol === symbol);
    if (stock) {
      setWatchlist((prev) => [...prev, stock]);
      setNewSymbol("");
      setShowAddStock(false);
    }
  };

  const handleDeleteFromWatchlist = (symbol) => {
    setWatchlist((prev) => prev.filter((stock) => stock.symbol !== symbol));
  };

  const calculatePriceChange = (stock) => {
    const priceChange = stock.last - stock.open;
    const priceChangePercent = (priceChange / stock.open) * 100;
    return {
      priceChange,
      priceChangePercent,
      isPositive: priceChange >= 0,
    };
  };

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => {
              const { priceChangePercent, isPositive } = calculatePriceChange(stock);

              return (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>${stock.last.toFixed(2)}</td>
                  <td className={isPositive ? "text-success" : "text-danger"}>
                    {isPositive ? "+" : ""}
                    {priceChangePercent.toFixed(2)}%
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteFromWatchlist(stock.symbol)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {showAddStock ? (
          <>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search Stock Symbol"
                value={newSymbol}
                onChange={(e) => setNewSymbol(e.target.value)}
              />
              <button
                onClick={() => setShowAddStock(false)}
                className="btn btn-outline-secondary"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
            <div className="list-group">
              {stocks
                .filter((s) => 
                  s.symbol.toLowerCase().includes(newSymbol.toLowerCase()) &&
                  !watchlist.some((stock) => stock.symbol === s.symbol)
                )
                .map((stock, index) => (
                  <button
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleAddToWatchlist(stock.symbol)}
                  >
                    {stock.symbol} - {stock.name}
                  </button>
                ))}
            </div>
          </>
        ) : (
          <button
            onClick={() => setShowAddStock(true)}
            className="btn btn-primary"
          >
            <Plus size={18} className="me-2" /> Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchlistTab;
