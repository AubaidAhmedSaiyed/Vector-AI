import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../App.css";
import {
  addInventoryItem,
  deleteInventoryItem,
  getInventory,
  updateInventoryItem,
  uploadCSV,
} from "../../Api/Api";

function AdminStockManagement({ toggleTheme }) {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= MANUAL ADD ================= */
  const [newItem, setNewItem] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    cost: "",
  });

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await getInventory();
      setStock(items);
    } catch (loadError) {
      console.error("Failed to load inventory", loadError);
      setError(loadError?.message || "Failed to load inventory.");
      setStock([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const addItemManually = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      setSaving(true);
      await addInventoryItem({
        ...newItem,
        sku:
          newItem.sku ||
          `${newItem.name.replace(/\s+/g, "-").toUpperCase()}-${Date.now()}`,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        cost: Number(newItem.cost || newItem.price),
      });
      setNewItem({ name: "", sku: "", quantity: "", price: "", cost: "" });
      await loadInventory();
    } catch (saveError) {
      console.error("Failed to add item", saveError);
      setError(saveError?.message || "Failed to add item.");
    } finally {
      setSaving(false);
    }
  };

  /* ================= CSV UPLOAD ================= */
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file");
      return;
    }

    try {
      setSaving(true);
      await uploadCSV(file);
      await loadInventory();
    } catch (uploadError) {
      console.error("Failed to upload CSV", uploadError);
      setError(uploadError?.message || "CSV upload failed.");
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  const handleInlineChange = (id, field, value) => {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "quantity" || field === "price" || field === "cost"
                ? Number(value)
                : value,
            }
          : item
      )
    );
  };

  const saveRow = async (item) => {
    try {
      setSaving(true);
      await updateInventoryItem(item.id, {
        name: item.name,
        sku: item.sku,
        quantity: Number(item.quantity),
        price: Number(item.price),
        cost: Number(item.cost || item.price),
        category: item.category,
        brand: item.brand,
      });
      await loadInventory();
    } catch (updateError) {
      console.error("Failed to update item", updateError);
      setError(updateError?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const removeRow = async (id) => {
    try {
      setSaving(true);
      await deleteInventoryItem(id);
      await loadInventory();
    } catch (deleteError) {
      console.error("Failed to delete item", deleteError);
      setError(deleteError?.message || "Delete failed.");
    } finally {
      setSaving(false);
    }
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
            Manage products directly in MongoDB Atlas through backend APIs.
          </p>
          {error && <p className="note">{error}</p>}
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
              placeholder="SKU (optional)"
              value={newItem.sku}
              onChange={(e) =>
                setNewItem({ ...newItem, sku: e.target.value })
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
              type="number"
              placeholder="Selling Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Cost Price"
              value={newItem.cost}
              onChange={(e) =>
                setNewItem({ ...newItem, cost: e.target.value })
              }
            />

            <button type="button" onClick={addItemManually} disabled={saving}>
              {saving ? "Saving..." : "Add Item"}
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
              disabled={saving}
              hidden
            />

            <div className="csv-upload-content">
              <div className="csv-icon">📄</div>
              <p className="csv-title">Click to upload CSV file</p>
              <p className="note">
                Format: <code>name,sku,quantity,price,cost</code>
              </p>
            </div>
          </label>
        </div>

        {/* STOCK TABLE */}
        <div className="card">
          <h3>Current Inventory</h3>
          {loading && <p className="note">Loading inventory...</p>}

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      value={item.name}
                      onChange={(e) => handleInlineChange(item.id, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.sku || ""}
                      onChange={(e) => handleInlineChange(item.id, "sku", e.target.value)}
                    />
                  </td>
                  <td className="numeric">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleInlineChange(item.id, "quantity", e.target.value)}
                    />
                  </td>
                  <td className="numeric">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleInlineChange(item.id, "price", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.cost}
                      onChange={(e) => handleInlineChange(item.id, "cost", e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveRow(item)} disabled={saving}>
                      Save
                    </button>{" "}
                    <button onClick={() => removeRow(item.id)} disabled={saving}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && stock.length === 0 && (
                <tr>
                  <td colSpan="6">No inventory data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminStockManagement;
