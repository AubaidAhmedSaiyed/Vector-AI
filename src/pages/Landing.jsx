import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleContinue = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="flickr-landing">
        <div className="flickr-content">

          {/* BADGE */}
          <span className="hero-badge">
            🚀 AI-powered Retail Intelligence
          </span>

          {/* TITLE */}
          <h1 className="flickr-title">
            Smarter Retail Starts with{" "}
            <span className="heading">RetailVision</span>
          </h1>

          {/* SUBTITLE */}
          <p className="hero-subtitle">
            Predict demand. Reduce waste. Make confident decisions.
          </p>

          {/* DESCRIPTION */}
          <p className="flickr-support">
            RetailVision helps retailers forecast demand, optimize inventory,
            and unlock actionable insights — all from a single intelligent
            AI-powered dashboard.
          </p>

          {/* CTA GROUP */}
          <div className="landing-cta">
            <button className="cta-primary" onClick={handleContinue}>
              Get Started Free
            </button>

            <button
              className="cta-secondary"
              onClick={() => navigate("/signup")}
            >
              View Demo
            </button>
          </div>

          {/* TRUST STRIP */}
          <div className="hero-trust">
            <div className="trust-card">
              <strong>30%</strong>
              <span>Less Stock Waste</span>
            </div>
            <div className="trust-card">
              <strong>2×</strong>
              <span>Faster Decisions</span>
            </div>
            <div className="trust-card">
              <strong>AI</strong>
              <span>Smart Sales Insights</span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 RetailVision • Built for Innovation
      </footer>
    </div>
  );
}

export default Landing;
