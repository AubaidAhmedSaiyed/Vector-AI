import React from "react";
import DashboardNavbar from "../../components/DashboardNavbar";

function StockManagement({ toggleTheme }) {
  return (
    <>
      <DashboardNavbar toggleTheme={toggleTheme} />

      <div className="container">

        <div className="card">
          <h3>Audit Receipt Inbox</h3>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>System Qty</th>
                <th>Staff Counted</th>
                <th>Variance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Milk 500ml</td>
                <td>15</td>
                <td>12</td>
                <td className="numeric">-3</td>
              </tr>

              <tr>
                <td>Bread</td>
                <td>22</td>
                <td>22</td>
                <td className="numeric">0</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button className="approve-btn">
              Approve Audit
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default StockManagement;