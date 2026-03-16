import React from "react";
import DashboardNavbar from "../../components/DashboardNavbar";

function Intelligence({ toggleTheme }) {
  return (
    <>
      <DashboardNavbar toggleTheme={toggleTheme} />

      <div className="container">

        {/* Expiry Risk */}
        <div className="card">
          <h3>Expiry Financial Risk</h3>
          <p>
            ₹ 12,400 worth inventory is expiring within 7 days.
          </p>
        </div>

        {/* Dead Stock */}
        <div className="card">
          <h3>Dead Stock (60+ Days No Sales)</h3>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Days Without Sale</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Cold Drink 2L</td>
                <td>25</td>
                <td className="numeric">72</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: "20px" }}>
            <button className="approve-btn">
              Mark for Clearance Sale
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default Intelligence;