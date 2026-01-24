import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  // ✅ missing states (THIS WAS IMPORTANT)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 🔹 ADMIN LOGIN (demo)
    if (cleanEmail === "admin@retail.com" && cleanPassword === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("token", "demo-admin-token");
      navigate("/admin/Dashboard");
      return;
    }

    // 🔹 STAFF LOGIN (demo)
    if (cleanEmail === "staff@retail.com" && cleanPassword === "staff123") {
      localStorage.setItem("role", "staff");
      localStorage.setItem("token", "demo-staff-token");
      navigate("/staff/StaffDashboard");
      return;
    }

    alert("Invalid email or password");
  };

  return (
    <>
      <Navbar variant="minimal" />

      <div className="login-container">
        <div className="login-card glass">
          <h2>Login to RetailVision</h2>

          {/* DEMO INFO */}
          <p className="note" style={{ marginBottom: "12px" }}>
            <strong>Demo Credentials:</strong><br />
            Admin → admin@retail.com / admin123<br />
            Staff → staff@retail.com / staff123
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="note">
            New user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
