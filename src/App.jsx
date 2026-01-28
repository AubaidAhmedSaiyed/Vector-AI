import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminStockManagement from "./pages/admin/StockManagment";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffStockManagement from "./pages/staff/StaffStockManagment";

function App() {
  /* ================= THEME STATE ================= */
  const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <GoogleOAuthProvider clientId="129732006800-bm3kfa4reejbav0gggm4c642v3imrab0.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/login" element={<Login toggleTheme={toggleTheme} theme={theme} />} />
          <Route path="/signup" element={<Signup toggleTheme={toggleTheme} theme={theme} />} />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard toggleTheme={toggleTheme} theme={theme} />}
          />
          <Route
            path="/admin/stock"
            element={<AdminStockManagement toggleTheme={toggleTheme} theme={theme} />}
          />

          <Route
            path="/staff/dashboard"
            element={<StaffDashboard toggleTheme={toggleTheme} theme={theme} />}
          />
          <Route
            path="/staff/stock"
            element={<StaffStockManagement toggleTheme={toggleTheme} theme={theme} />}
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
