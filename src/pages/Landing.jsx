import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();

  /* ===== TYPING LOGIC ===== */
  const fullText = "RetailVision";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    document.body.style.overflow = "auto";

    let index = 0; // ✅ yahi missing tha

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="landing-page">
      {/* ================= HERO ================= */}
      <section className="flickr-landing">
        <div className="flickr-content">
          {/* Rocket badge animation */}
          <span className="hero-badge animate-badge">
            🚀 AI-powered Retail Intelligence
          </span>

          {/* Typing title */}
          <h1 className="flickr-title">
            Smarter Retail Starts with{" "}
            <span className="heading typing-text">{typedText}</span>
          </h1>

          <p className="hero-subtitle">
            Predict demand. Reduce waste. Make confident decisions.
          </p>

          <p className="flickr-support">
            RetailVision is an AI-driven retail management platform built for
            small and medium businesses. It automates billing, optimizes
            inventory, and delivers real-time insights to help retailers run
            smarter, faster operations.
          </p>

          <div className="landing-cta">
            <button className="cta-primary" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/signup")}
            >
              View Demo
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-card">
              <strong>~30%</strong>
              <span>Faster Billing</span>
            </div>
            <div className="trust-card">
              <strong>~25%</strong>
              <span>Fewer Stock Errors</span>
            </div>
            <div className="trust-card">
              <strong>2×</strong>
              <span>Sales Visibility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section">
        <h2 className="section-title">Key Features</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>AI Demand Forecasting</h3>
            <p>
              Forecast product demand using historical sales data to minimize
              overstocking and prevent stockouts.
            </p>
          </div>

          <div className="info-card">
            <h3>Smart Inventory Management</h3>
            <p>
              Track inventory in real time with automated alerts and stock
              insights across locations.
            </p>
          </div>

          <div className="info-card">
            <h3>Sales & Performance Analytics</h3>
            <p>
              Visual dashboards that turn raw sales data into actionable
              business decisions.
            </p>
          </div>

          <div className="info-card">
            <h3>Unified Retail Dashboard</h3>
            <p>
              Manage billing, inventory, analytics, and insights from a single,
              centralized platform.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY RETAILVISION ================= */}
      <section className="section alt-section">
        <h2 className="section-title">Why RetailVision?</h2>

        <div className="why-grid">
          <div className="why-item">
            <h3>Built for Indian Retail</h3>
            <p>
              Designed specifically for small and medium retailers with
              real-world workflows and practical use cases.
            </p>
          </div>

          <div className="why-item">
            <h3>AI-Driven Insights</h3>
            <p>
              Make smarter decisions using AI-powered forecasting and analytics,
              not guesswork.
            </p>
          </div>

          <div className="why-item">
            <h3>Simple, Scalable & Secure</h3>
            <p>
              Easy to start, quick to adopt, and scalable as your business
              grows.
            </p>
          </div>
        </div>
      </section>

      {/* ================= USERS ================= */}
      <section className="section">
        <h2 className="section-title">Who Is RetailVision For?</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>Shop Owners</h3>
            <p>
              Maintain complete visibility over inventory, profits, and sales
              trends without manual tracking.
            </p>
          </div>

          <div className="info-card">
            <h3>Store Staff</h3>
            <p>
              Faster billing and reduced mistakes through automated and
              simplified workflows.
            </p>
          </div>

          <div className="info-card">
            <h3>Managers</h3>
            <p>
              Use real-time insights to plan inventory, monitor performance, and
              optimize operations.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section alt-section">
        <h2 className="section-title">About RetailVision</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>What We Do</h3>
            <p>
              RetailVision provides an AI-driven retail management platform that
              helps small and medium businesses automate billing, manage
              inventory, and gain real-time insights.
            </p>
          </div>

          <div className="info-card">
            <h3>Why We Exist</h3>
            <p>
              We eliminate manual errors and guesswork by bringing data-driven
              decision-making to everyday retail operations.
            </p>
          </div>

          <div className="info-card">
            <h3>Our Vision</h3>
            <p>
              Empower small retailers with enterprise-level tools to compete
              confidently in a digital-first retail ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section contact-highlight">
        <h2 className="section-title">Contact Us</h2>

        <p className="section-text">
          Have questions or want to explore how RetailVision can help your
          business? Send us a message and our team will get back to you.
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2026 RetailVision • Built for Innovation
      </footer>
    </div>
  );
}

export default Landing;
