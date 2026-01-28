import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Signup = ({ toggleTheme }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API later
    console.log(formData);

    alert("Signup successful");
    navigate("/login");
  };

  return (
    <>
      {/* ✅ Navbar add karo */}
      <Navbar variant="minimal" toggleTheme={toggleTheme} />

      <div className="login-container">
        <div className="login-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <div className="role-select">
              <select name="role" onChange={handleChange}>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>


            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>

          <p className="note">
            Already have account? <Link to="/login">Login now</Link>
          </p>
        </div>
      </div>
    </>
  );

};

export default Signup;
