import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Dashboards
import AdminDashboard from "./pages/admin/Dashboard";

// (abhi staff dashboard nahi hai to temporary same use kar lo)
import StaffDashboard from "./pages/staff/StaffDashboard";

function App() {
  return (
    <GoogleOAuthProvider clientId="129732006800-bm3kfa4reejbav0gggm4c642v3imrab0.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Role-based routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
