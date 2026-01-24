import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function DashboardNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>RetailVision</div>

      <div style={{ display: "flex", gap: "20px", marginLeft: "auto" }}>
        <Link to={role === "admin" ? "/admin/dashboard" : "/staff/dashboard"}>
          Dashboard
        </Link>

        {role === "admin" && (
          <>
            <Link to="/admin/stock">Stock</Link>
          </>
        )}

        {role === "staff" && (
          <>
            <Link to="/staff/stock">Stock</Link>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--accent)",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardNavbar;
