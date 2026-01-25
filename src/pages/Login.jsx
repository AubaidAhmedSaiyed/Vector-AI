import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import "../App.css";

// ✅ API IMPORT
import { loginUser } from "../Api/Api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ CLEAR OLD SESSION ON PAGE LOAD (CORRECT USE OF useEffect)
  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // ✅ API CALL
      const res = await loginUser(cleanEmail, cleanPassword);

      const role = res.role.toLowerCase().trim();

      localStorage.setItem("role", role);
      localStorage.setItem("token", res.token);

      // ✅ ROLE-BASED REDIRECT
      navigate(`/${role}/dashboard`);
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar variant="minimal" />

      <div className="login-container">
        <div className="login-card glass">
          <h2>Login to RetailVision</h2>

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

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={(res) => {
                localStorage.setItem("role", "staff");
                localStorage.setItem("token", res.credential);
                navigate("/staff/dashboard");
              }}
              onError={() => {
                alert("Google Login Failed");
              }}
            />
          </div>

          <p className="note">
            New user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
