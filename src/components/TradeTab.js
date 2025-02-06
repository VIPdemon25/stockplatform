import React, { useState} from "react";
import {ToastContainer ,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const TradeTab = ({ stocks }) => {
  const [tradeType, setTradeType] = useState("buy");
  const [symbol, setSymbol] = useState("");
  const [stockName, setStockName] = useState(""); // add stock name
  const [quantity, setQuantity] = useState("");
  const [useRiskManagement, setUseRiskManagement] = useState(false);
  const [riskPerTrade, setRiskPerTrade] = useState("");
  const [stopLoss, setStopLoss] = useState("");



  const handleTrade = async (e) => {
    e.preventDefault();
    const stock = stocks.find(stock => stock.symbol === symbol && stock.name === stockName);

    if (!stock) {
      alert("Invalid stock symbol or name. Please enter correct details.");
      return;
    }
    const id = stock.stockId;
    const token = sessionStorage.getItem("token");
    const price_per_share = stock.open;
    const total_price = stock.open * quantity;
    const accountId = sessionStorage.getItem("accountId");
    const unit_risk=(riskPerTrade/100)*price_per_share;
    const basePayload = { stockId: id, transType: tradeType, symbol, stockName, numShares: quantity, accountId };
    const r_basePayload = { stockId: id, transType: tradeType, symbol, stockName, numShares: 0, accountId };
    const payloads = {
      buyWithoutRisk: { ...basePayload, typeOfPurchase: "marketplan", typeOfSell: "marketplan", riskPerTrade: 0, stopLoss: 0, entryPrice: total_price },
      buyWithRisk: { ...r_basePayload, typeOfPurchase: "positionSizing", typeOfSell: "marketplan", riskPerTrade: unit_risk, stopLoss, entryPrice: price_per_share },
      sellWithoutRisk: { ...basePayload, typeOfPurchase: "marketplan", typeOfSell: "marketplan", riskPerTrade: 0, stopLoss: 0, entryPrice: total_price },
      sellWithRisk: { ...r_basePayload, typeOfPurchase: "marketplan", typeOfSell: "stoploss", riskPerTrade: 0, stopLoss, entryPrice: total_price }
    };

    console.log(payloads);
    // send data to backend with appropriate payload
    try {
      if (tradeType === "buy") {
        if (useRiskManagement) {
          await axios.post('http://localhost:9090/api/orders/buy/positionSizing', payloads.buyWithRisk,{
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          });
        } else {
          await axios.post('http://localhost:9090/api/orders/buy/MarketPlan', payloads.buyWithoutRisk,{
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          });
        }
      } else if (tradeType === "sell") {
        if (useRiskManagement) {
          await axios.post('http://localhost:9090/api/orders/sell/stopLoss', payloads.sellWithRisk,{
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          });
        } else {
          await axios.post('http://localhost:9090/api/orders/sell/MarketPlan', payloads.sellWithoutRisk,{
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          });
        }
      }
      toast.success("Trade successfully placed!");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

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
            type="text"
            className="form-control"
            placeholder="Stock Name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)} // set stock name
            required
          />
        </div>
        {(!useRiskManagement) && (
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
        )}
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
                placeholder="Stop Loss"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
              />
            </div>
            {tradeType === "buy" && (
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Risk Per Trade (%)"
                  value={riskPerTrade}
                  onChange={(e) => setRiskPerTrade(e.target.value)}
                />
              </div>
            )}
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Place Order
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default TradeTab;
