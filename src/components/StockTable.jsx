function StockTable({ stock = [], loading = false, error = "" }) {
  if (loading) {
    return <p className="note">Loading inventory...</p>;
  }

  if (error) {
    return <p className="note">{error}</p>;
  }

  return (
    <>
      <h3>📊 Current Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
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
          {stock.length === 0 && (
            <tr>
              <td colSpan="3">No inventory items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default StockTable;
