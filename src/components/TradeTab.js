import React, { useState } from "react"

const TradeTab = () => {
  const [tradeType, setTradeType] = useState("buy")
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [useRiskManagement, setUseRiskManagement] = useState(false)
  const [positionSize, setPositionSize] = useState("")
  const [stopLoss, setStopLoss] = useState("")

  const handleTrade = (e) => {
    e.preventDefault()
    console.log("Trade:", { tradeType, symbol, quantity, price, useRiskManagement, positionSize, stopLoss })
  }

  return (
    <div className="trade animate__animated animate__fadeIn">
      <h2 className="mb-4 text-primary">Trade</h2>
      <form onSubmit={handleTrade}>
        <div className="mb-3">
          <div className="btn-group" role="group">
            <input
              type="radio"
              className="btn-check"
              name="tradeType"
              id="buyOption"
              value="buy"
              checked={tradeType === "buy"}
              onChange={(e) => setTradeType(e.target.value)}
            />
            <label className="btn btn-outline-primary" htmlFor="buyOption">
              Buy
            </label>
            <input
              type="radio"
              className="btn-check"
              name="tradeType"
              id="sellOption"
              value="sell"
              checked={tradeType === "sell"}
              onChange={(e) => setTradeType(e.target.value)}
            />
            <label className="btn btn-outline-primary" htmlFor="sellOption">
              Sell
            </label>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="useRiskManagement"
            checked={useRiskManagement}
            onChange={(e) => setUseRiskManagement(e.target.checked)}
          />
          <label className="form-check-label text-light" htmlFor="useRiskManagement">
            Use Risk Management
          </label>
        </div>
        {useRiskManagement && (
          <>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Position Sizing (%)"
                value={positionSize}
                onChange={(e) => setPositionSize(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Stop Loss"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
    </div>
  )
}

export default TradeTab

