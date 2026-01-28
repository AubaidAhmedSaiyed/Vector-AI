import React from "react";
import Navbar from "../../components/Navbar";
import StockTable from "../../components/StockTable";
import Alerts from "../../components/Alerts";
import "../../App.css";

function StaffDashboard({ toggleTheme }) {
  return (
    <>
      <Navbar variant="dashboard" toggleTheme={toggleTheme} />
      <div className="container">
        <p>Staff Dashboard</p>
      </div>
    </>
  );
}

export default StaffDashboard;
