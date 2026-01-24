import React, { useState, useEffect } from "react";

// Components
import SalesForm from "../../components/SalesForm";
import StockTable from "../../components/StockTable";
import Alerts from "../../components/Alerts";
import Analytics from "../../components/Analytics";
import InventoryPie from "../../components/InventoryPie";
import DashboardNavbar from "../../components/DashboardNavbar";

import "../../App.css";

// ✅ API
import { getSalesSuggestions } from "../../Api/Api";

function Dashboard() {
  const [stock, setStock] = useState([
    {
      name: "Milk",
      quantity: 20,
      soldToday: 0,
      price: 30,
      cost: 25,
      expiry: "2026-01-10",
    },
    {
      name: "Maggi",
      quantity: 40,
      soldToday: 0,
      price: 15,
      cost: 10,
      expiry: "2026-03-01",
    },
  ]);

  // 🔥 suggestions state
  const [suggestions, setSuggestions] = useState([]);

  /* ================= SALES ================= */
  const addSale = (itemName, soldQty) => {
    const updatedStock = stock.map((item) =>
      item.name === itemName
        ? {
            ...item,
            quantity: item.quantity - soldQty,
            soldToday: item.soldToday + soldQty,
          }
        : item
    );
    setStock(updatedStock);
  };

  /* ================= LOAD SUGGESTIONS ================= */
  useEffect(() => {
    const loadSuggestions = async () => {
      const data = await getSalesSuggestions();
      setSuggestions(data);
    };

    loadSuggestions();
  }, []);

  return (
    <>
      <DashboardNavbar />

      <div className="container">
        {/* SALES FORM */}
        <div className="card">
          <SalesForm addSale={addSale} />
        </div>

        {/* STOCK TABLE */}
        <div className="card">
          <StockTable stock={stock} />
        </div>

        {/* ANALYTICS */}
        <div className="analytics-row">
          <div className="card chart-box">
            <Analytics stock={stock} />
          </div>

          <div className="card chart-box">
            <InventoryPie stock={stock} />
          </div>
        </div>

        {/* 🔥 SALES SUGGESTIONS */}
        <div className="card">
          <h3>💡 Sales Suggestions</h3>

          <div className="suggestion-list">
            {suggestions.map((s, i) => (
              <div className="suggestion-item" key={i}>
                <h4 className="suggestion-title">{s.product}</h4>

                <p className="suggestion-text">
                  <span>Pair with:</span> {s.pairWith.join(", ")}
                </p>

                <p className="suggestion-offer">🎯 {s.offer}</p>
              </div>
            ))}

            {suggestions.length === 0 && (
              <p className="note">No suggestions available</p>
            )}
          </div>
        </div>

        {/* ALERTS */}
        <div className="card">
          <Alerts stock={stock} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
