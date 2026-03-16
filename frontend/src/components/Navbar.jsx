import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BRAND_NAME } from "../config/brand";
import logo from "../assets/logo.png";
import { SunMoon } from "lucide-react";

const Navbar = ({ toggleTheme, variant }) => {
  const navigate = useNavigate();

  /* ================= UI ================= */

  return (
    <header className="navbar">
      {/* Left: Brand */}
      <div
        className="nav-left"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Vector AI" className="brand-logo" />
        <span className="brand-text">{BRAND_NAME}</span>
      </div>

      {/* Right actions */}
      <div className="nav-actions">
        {/* Theme toggle (professional) */}
        <button
          onClick={toggleTheme}
          title="Switch theme"
          className="theme-toggle-btn"
        >
          <SunMoon size={18} />
        </button>

        <button className="nav-link-btn" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="nav-primary-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
