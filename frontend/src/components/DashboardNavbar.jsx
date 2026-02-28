import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { BRAND_NAME } from "../config/brand";
import logo from "../assets/logo.png";
import { SunMoon } from "lucide-react";

function DashboardNavbar({ toggleTheme }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") === "admin" ? "admin" : "staff";
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(`/${role}/${path}`, { replace: true });
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <button className="hamburger" onClick={() => setOpen(!open)}>
            ☰
          </button>

          <div className="brand">
            <img src={logo} alt="Vector AI Logo" className="brand-logo" />
            <span>{BRAND_NAME}</span>
          </div>
        </div>

        <div className="nav-actions">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Switch theme"
            className="theme-toggle-btn"
          >
            <SunMoon size={18} />
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button className="sidebar-btn" onClick={() => goTo("dashboard")}>
          📊 Dashboard
        </button>

        <button className="sidebar-btn" onClick={() => goTo("stock")}>
          📦 Stock
        </button>
      </div>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}

export default DashboardNavbar;
