import React, { useState } from "react";

function SalesForm({ addSale }) {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSale(item, Number(qty));
    setItem("");
    setQty("");
  };

  return (
    <>
      <h3>➕ Add Daily Sale</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Item Name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity Sold"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button>Add Sale</button>
      </form>
    </>
  );
}

export default SalesForm;
