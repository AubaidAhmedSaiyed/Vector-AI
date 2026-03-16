import React from "react";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "../assets/logo.png";
import { BRAND_NAME } from "../config/brand";
const Footer = () => {
  return (
    <footer className="main-footer">
      {" "}
      <div className="footer-top-border"></div>{" "}
      <div className="footer-container">
        {" "}
        {/* Column 1: Brand */}{" "}
        <div className="footer-column">
          {" "}
          <div
            className="nav-left"
            style={{ marginBottom: "20px", cursor: "default" }}
          >
            {" "}
            <img src={logo} alt={BRAND_NAME} className="brand-logo" />{" "}
            <span className="brand-text" style={{ color: "#FFFFFF" }}>
              {BRAND_NAME}
            </span>{" "}
          </div>{" "}
          <p style={{ color: "#CBD5E1" }}>
            AI-powered retail intelligence platform.
          </p>{" "}
        </div>{" "}
        {/* Column 2: Product */}{" "}
        <div className="footer-column">
          {" "}
          <h3>Product</h3>{" "}
          <ul className="footer-links">
            {" "}
            <li>
              <a href="#" className="hover-underline">
                Features
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Pricing
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Demo
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Dashboard
              </a>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* Column 3: Company */}{" "}
        <div className="footer-column">
          {" "}
          <h3>Company</h3>{" "}
          <ul className="footer-links">
            {" "}
            <li>
              <a href="#" className="hover-underline">
                About
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Contact
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Careers
              </a>
            </li>{" "}
            <li>
              <a href="#" className="hover-underline">
                Privacy Policy
              </a>
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        {/* Column 4: Connect */}{" "}
        <div className="footer-column">
          {" "}
          <h3>Connect</h3>{" "}
          <div className="social-links">
            {" "}
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>{" "}
            <a href="#" className="social-icon" aria-label="Twitter">
              <Twitter size={22} />
            </a>{" "}
            <a href="#" className="social-icon" aria-label="GitHub">
              <Github size={22} />
            </a>{" "}
            <a href="#" className="social-icon" aria-label="Instagram">
              <Instagram size={22} />
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="footer-bottom">
        {" "}
        <p className="copyright">
          © 2026 {BRAND_NAME} · Built for Innovation
        </p>{" "}
      </div>{" "}
    </footer>
  );
};
export default Footer;