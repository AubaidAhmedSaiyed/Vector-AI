function Alerts({ stock }) {
  return (
    <>
      <h3>⏰ Expiry Alerts</h3>
      {stock.map((item, index) =>
        item.name === "Milk" ? (
          <div key={index} className="alert">
            ⚠️ Milk will expire soon!
          </div>
        ) : null
      )}
    </>
  );
}

export default Alerts;
