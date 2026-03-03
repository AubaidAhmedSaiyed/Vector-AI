
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import "../../App.css";
import { getInventory } from "../../Api/Api";

function StaffStockManagement({ toggleTheme }) {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInventory = async () => {
      try {
        setLoading(true);
        setError("");
        const items = await getInventory();
        setStock(items);
      } catch (loadError) {
        console.error("Failed to load staff stock", loadError);
        setError(loadError?.message || "Unable to load stock from backend.");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

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
          {loading && <p className="note">Loading inventory...</p>}
          {error && <p className="note">{error}</p>}

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Expiry</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id || item.name}>
                  <td>{item.name}</td>
                  <td className="numeric">{item.quantity}</td>
                  <td>{item.expiry || "-"}</td>
                </tr>
              ))}
              {!loading && stock.length === 0 && (
                <tr>
                  <td colSpan="3">No stock found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StaffStockManagement;
