import React, { useState } from "react";

// ✅ FIXED IMPORT PATHS
import SalesForm from "../../components/SalesForm";
import StockTable from "../../components/StockTable";
import Alerts from "../../components/Alerts";
import Analytics from "../../components/Analytics";
import InventoryPie from "../../components/InventoryPie";

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

  // Add sale logic
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

  return (
    <div className="container">
      {/* Sales Form */}
      <div className="card">
        <SalesForm addSale={addSale} />
      </div>

      {/* Stock Table */}
      <div className="card">
        <StockTable stock={stock} />
      </div>

      {/* 📊 ANALYTICS SECTION */}
      <div className="analytics-row">
        <div className="card chart-box">
          <Analytics stock={stock} />
        </div>

        <div className="card chart-box">
          <InventoryPie stock={stock} />
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <Alerts stock={stock} />
      </div>
    </div>
  );
}

export default Dashboard;
