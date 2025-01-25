import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const CreateCompany = ({ onStockSubmit }) => {
  const [newStock, setNewStock] = useState({
    name: "",
    symbol: "",
    sharesToRelease: "",
    companyType: "",
    entryPrice: "",
  });

  const handleInputChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const backendPayload = {
      name: newStock.name,
      symbol: newStock.symbol,
      totalShares: newStock.sharesToRelease,
      type: newStock.companyType,
      entryPrice: newStock.entryPrice,
    };

    onStockSubmit(backendPayload);

    setNewStock({
      name: "",
      symbol: "",
      sharesToRelease: "",
      companyType: "",
      entryPrice: "",
    });
  };

  return (
    <div className="card bg-dark border-primary mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">
          <PlusCircle size={20} className="me-2" />
          New Stock Registration
        </h5>
        <form onSubmit={handleSubmit}>
          {/* Stock Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control bg-dark text-light border-primary"
              placeholder="Stock Name"
              name="name"
              value={newStock.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Stock Symbol */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control bg-dark text-light border-primary"
              placeholder="Stock Symbol"
              name="symbol"
              value={newStock.symbol}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Number of Shares to Release */}
          <div className="mb-3">
            <input
              type="number"
              className="form-control bg-dark text-light border-primary"
              placeholder="Number of Shares to Release"
              name="sharesToRelease"
              value={newStock.sharesToRelease}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Type of Company */}
          <div className="mb-3">
            <div className="input-group position-relative">
              <select
                className="form-select bg-dark text-light border-primary pe-5" // Add padding for the arrow
                name="companyType"
                value={newStock.companyType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select Type of Company
                </option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Startup">Startup</option>
                <option value="Other">Other</option>
              </select>
              <span className="position-absolute end-0 top-0 bottom-0 d-flex align-items-center pe-3 bg-transparent">
                <i className="bi bi-chevron-down text-light"></i> {/* Bootstrap icon for downward arrow */}
              </span>
            </div>
          </div>

          {/* Entry Price */}
          <div className="mb-3">
            <input
              type="number"
              className="form-control bg-dark text-light border-primary"
              placeholder="Entry Price"
              name="entryPrice"
              value={newStock.entryPrice}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Register Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;