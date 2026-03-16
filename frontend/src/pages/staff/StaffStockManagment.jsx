import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";

function StaffStockManagement({ toggleTheme }) {
  const [stock] = useState([
    { name: "Milk", quantity: 20, expiry: "2026-01-10" },
    { name: "Maggi", quantity: 40, expiry: "2026-03-01" },
  ]);

  return (
    <>
      <Navbar variant="dashboard" toggleTheme={toggleTheme} />

      <div className="container">
        <div className="card">
          <h2>Staff – Stock Overview</h2>
          <p className="note">
            View stock levels and expiry information
          </p>
        </div>

        <div className="card">
          <h3>Available Stock</h3>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td className="numeric">{item.quantity}</td>
                  <td>{item.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StaffStockManagement;
