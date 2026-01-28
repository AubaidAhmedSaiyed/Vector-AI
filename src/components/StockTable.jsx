function StockTable({ stock }) {
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
          {stock.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td className="numeric">{item.quantity}</td>
              <td>{item.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default StockTable;
