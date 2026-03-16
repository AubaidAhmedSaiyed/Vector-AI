import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar"; 
import StockTable from "../../components/StockTable";
import Alerts from "../../components/Alerts";
import "../../App.css";

const StaffDashboard = ({ toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <>
      <DashboardNavbar toggleTheme={toggleTheme} />
      <div className="container">
      {/* Morning Moves */}
      <div className="card">
        <h3>Morning Moves (Expiring in 48h)</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Milk 500ml</td>
              <td>#M12</td>
              <td>2 Days</td>
              <td><button className="ghost-btn">Moved</button></td>
            </tr>
            <tr>
              <td>Bread Classic</td>
              <td>#B22</td>
              <td>1 Day</td>
              <td><button className="ghost-btn">Discount</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rapid Audit */}
      <div className="card">
        <h3>Rapid Audit (AI Flagged)</h3>
        <div className="suggestion-list">
          <div className="suggestion-item">
            <p className="suggestion-title">Amul Butter</p>
            <p className="suggestion-text">
              System suspects stock mismatch.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            className="approve-btn"
            onClick={() => navigate("/staff/StaffOrders")}
          >
            Start Physical Audit
          </button>
        </div>
      </div>

      {/* Receipt */}
      <div className="card">
        <h3>End of Shift</h3>
        <button
          className="approve-btn"
          onClick={() => navigate("/staff/StaffReports")}
        >
          Generate Receipt
        </button>
      </div>

    </div>
  </>
  );
};

export default StaffDashboard;
