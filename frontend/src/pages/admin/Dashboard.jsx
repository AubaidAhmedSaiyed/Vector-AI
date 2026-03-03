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
import { getInventory, getSalesSuggestions, updateInventoryItem } from "../../Api/Api";

function Dashboard({ toggleTheme, theme }) {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 suggestions state
  const [suggestions, setSuggestions] = useState([]);

  /* ================= SALES ================= */
  const addSale = async (itemName, soldQty) => {
    const matchedItem = stock.find((item) => item.name === itemName);
    if (!matchedItem) {
      setError("Item not found in inventory. Please select a valid product.");
      return;
    }

    const safeSoldQty = Number(soldQty);
    if (!Number.isFinite(safeSoldQty) || safeSoldQty <= 0) {
      return;
    }

    const nextQty = Math.max(0, Number(matchedItem.quantity || 0) - safeSoldQty);
    try {
      setError("");
      await updateInventoryItem(matchedItem.id, { quantity: nextQty });
      setStock((prev) =>
        prev.map((item) =>
          item.id === matchedItem.id
            ? { ...item, quantity: nextQty, soldToday: (item.soldToday || 0) + safeSoldQty }
            : item
        )
      );
    } catch (updateError) {
      console.error("Failed to record sale", updateError);
      setError("Failed to update stock. Please try again.");
    }
  };

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await getInventory();
      setStock(items.map((item) => ({ ...item, soldToday: item.soldToday || 0 })));
    } catch (loadError) {
      console.error("Failed to load inventory", loadError);
      setError(loadError?.message || "Unable to load inventory from backend.");
      setStock([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const data = await getSalesSuggestions();
        setSuggestions(data);
      } catch (suggestionError) {
        console.error("Failed to load sales suggestions", suggestionError);
        setSuggestions([]);
      }
    };

    loadSuggestions();
  }, []);

  return (
    <>
      <DashboardNavbar toggleTheme={toggleTheme} />

      <div className="container">
        {/* SALES FORM */}
        <div className="card">
          <SalesForm addSale={addSale} stock={stock} loading={loading} />
        </div>

        {/* STOCK TABLE */}
        <div className="card">
          <StockTable stock={stock} loading={loading} error={error} />
        </div>

        {/* ANALYTICS */}
        <div className="analytics-row">
          <div className="card chart-box">
            <Analytics stock={stock} theme={theme} />
          </div>

          <div className="card chart-box">
            <InventoryPie stock={stock} theme={theme} loading={loading} error={error} />
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
