import React, { useState } from "react";

function SalesForm({ addSale, stock = [], loading = false }) {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const hasStock = stock.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !qty) {
      return;
    }

    try {
      setSubmitting(true);
      await addSale(item, Number(qty));
    } finally {
      setSubmitting(false);
    }

    setItem("");
    setQty("");
  };

  return (
    <>
      <h3>➕ Add Daily Sale</h3>
      <form onSubmit={handleSubmit}>
        {hasStock ? (
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            disabled={loading || submitting}
          >
            <option value="">Select Item</option>
            {stock.map((stockItem) => (
              <option key={stockItem.id || stockItem.name} value={stockItem.name}>
                {stockItem.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            placeholder="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            disabled={loading || submitting}
          />
        )}
        <input
          type="number"
          placeholder="Quantity Sold"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          min="1"
          disabled={loading || submitting}
        />
        <button disabled={loading || submitting}>
          {submitting ? "Saving..." : "Add Sale"}
        </button>
        {!loading && !hasStock && (
          <p className="note">No items loaded from inventory. Add products in Admin Stock first.</p>
        )}
      </form>
    </>
  );
}

export default SalesForm;
