import React, { useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../App.css";

function AdminStockManagement({ toggleTheme }) {
  const [stock, setStock] = useState([
    {
      name: "Milk",
      quantity: 20,
      expiry: "2026-01-10",
      price: 30,
      active: true,
    },
    {
      name: "Maggi",
      quantity: 40,
      expiry: "2026-03-01",
      price: 15,
      active: true,
    },
  ]);

  /* ================= MANUAL ADD ================= */
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    expiry: "",
    price: "",
  });

  const addItemManually = () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) {
      alert("Please fill required fields");
      return;
    }

    setStock((prev) => [
      ...prev,
      {
        ...newItem,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        active: true,
      },
    ]);

    setNewItem({ name: "", quantity: "", expiry: "", price: "" });
  };

  /* ================= CSV PARSER ================= */
  const parseCSV = (text) => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      let obj = {};
      headers.forEach((h, i) => (obj[h] = values[i]));

      return {
        name: obj.name,
        quantity: Number(obj.quantity),
        expiry: obj.expiry,
        price: Number(obj.price),
        active: true,
      };
    });
  };

  /* ================= CSV UPLOAD ================= */
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCSV(event.target.result);
      setStock((prev) => [...prev, ...parsed]);
    };
    reader.readAsText(file);
  };

  /* ================= TOGGLE ACTIVE ================= */
  const toggleSelling = (index) => {
    setStock((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <>
      {/* ✅ DASHBOARD NAVBAR */}
      <DashboardNavbar toggleTheme={toggleTheme} />

      <div className="container">
        {/* HEADER */}
        <div className="card">
          <h2>Admin – Stock Management</h2>
          <p className="note">
            Products can be deactivated instead of deleting (industry practice)
          </p>
        </div>

        {/* MANUAL ADD */}
        <div className="card">
          <h3>Add Product Manually</h3>

          <form>
            <input
              placeholder="Product name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
            <input
              type="date"
              value={newItem.expiry}
              onChange={(e) =>
                setNewItem({ ...newItem, expiry: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />

            <button type="button" onClick={addItemManually}>
              Add Item
            </button>
          </form>
        </div>

        {/* CSV UPLOAD */}
        <div className="card">
          <h3>Upload Stock via CSV</h3>

          <label className="csv-upload-box">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              hidden
            />

            <div className="csv-upload-content">
              <div className="csv-icon">📄</div>
              <p className="csv-title">Click to upload CSV file</p>
              <p className="note">
                Format: <code>name, quantity, expiry, price</code>
              </p>
            </div>
          </label>
        </div>

        {/* STOCK TABLE */}
        <div className="card">
          <h3>Current Inventory</h3>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Expiry</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stock.map((item, index) => (
                <tr key={index} style={{ opacity: item.active ? 1 : 0.5 }}>
                  <td>{item.name}</td>
                  <td className="numeric">{item.quantity}</td>
                  <td>{item.expiry}</td>
                  <td className="numeric">₹{item.price}</td>
                  <td>{item.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button onClick={() => toggleSelling(index)}>
                      {item.active ? "Stop Selling" : "Resume"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminStockManagement;
