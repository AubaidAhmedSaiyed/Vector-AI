import React from "react";
import "../../App.css";
const StaffOrders = () => {
  return (
    <div className="container">
      <div className="card">
        <h3>Physical Audit</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>System Qty</th>
              <th>Physical Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Milk 500ml</td>
              <td>15</td>
              <td><input type="number" placeholder="Enter count" /></td>
            </tr>
            <tr>
              <td>Bread</td>
              <td>22</td>
              <td><input type="number" placeholder="Enter count" /></td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "20px" }}>
          <button className="approve-btn">
            Submit Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffOrders;