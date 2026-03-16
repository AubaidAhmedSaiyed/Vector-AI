import React from "react";

const StaffReports = () => {
  return (
    <div className="container">
      <div className="card">
        <h3>End of Shift Receipt</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>System</th>
              <th>Counted</th>
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
          </tbody>
        </table>

        <div style={{ marginTop: "20px" }}>
          <button className="approve-btn">
            Generate & Send to Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffReports;