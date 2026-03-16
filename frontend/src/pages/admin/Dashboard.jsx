import React, { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import Analytics from "../../components/Analytics";
import InventoryBar from "../../components/InventoryBar";

const demoStock = [
  { name: "Milk", quantity: 20, soldToday: 8, price: 50, cost: 30 },
  { name: "Bread", quantity: 15, soldToday: 5, price: 40, cost: 25 },
  { name: "Cold Drink", quantity: 25, soldToday: 10, price: 60, cost: 35 },
];
function AdminDashboard({ toggleTheme }) {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <DashboardNavbar toggleTheme={toggleTheme} />
  

      <div className="container">
        {/* STRATEGIC SUMMARY */}
        <div className="analytics-row">
          <div className="dashboard-header">
            <div className="header-left">
              <h2>Admin Dashboard</h2>
              <p className="header-subtitle">
                Monitor performance and insights in real-time
              </p>
            </div>

            <div className="header-right">
              <select className="date-filter">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="card">
            <h3>Pending Audit Receipts</h3>
            <h2 className="numeric">3</h2>
          </div>
          <div className="card">
            <h3>Today Revenue</h3>
            <h2 className="numeric">₹ 32,450</h2>
            <p className="growth positive">+8.4% from yesterday</p>
          </div>
          <div className="card">
            <h3>Low Stock Items</h3>
            <h2 className="numeric">5</h2>
          </div>
        </div>

        {/* AI GUIDANCE */}
        <div className="card">
          <h3>AI Strategic Suggestions</h3>

          <div className="suggestion-list">
            <div className="suggestion-item">
              <h4 className="suggestion-title">Milk</h4>
              <p className="suggestion-text">
                <span>Risk:</span> High expiry in 5 days.
              </p>
              <p className="suggestion-offer">
                🎯 Apply 10% discount to reduce waste.
              </p>
            </div>
          </div>
        </div>
        <div className="analytics-row">
          <div className="card">
            <h3>Revenue Trend</h3>
            <Analytics stock={demoStock} toggleTheme={toggleTheme} />
          </div>
          <div className="card">
            <h3>Inventory Health</h3>
            <InventoryBar stock={demoStock} toggleTheme={toggleTheme} />
          </div>
        </div>
        {/* CSV UPLOAD */}
        <div className="card">
          <h3>Bulk Inventory Upload</h3>

          <label className="csv-upload-box">
            <input type="file" hidden />
            <div className="csv-upload-content">
              <div className="csv-icon">📁</div>
              <div className="csv-title">Click to upload CSV file</div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
