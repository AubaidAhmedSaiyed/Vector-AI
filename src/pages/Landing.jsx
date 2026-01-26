import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import {
  BRAND_NAME,
  TAGLINE,
  BRAND_DESCRIPTION,
  COPYRIGHT_TEXT,
} from "../config/brand";

function Landing() {
  const navigate = useNavigate();
  const fullText = BRAND_NAME;

  /* ===== TYPING LOGIC ===== */
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    document.body.style.overflow = "auto";

    let index = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  /* ===== DEMO STOCK FOR GRAPH ===== */
  const demoStock = [
    {
      name: "Men Shirt",
      quantity: 48,
      soldToday: 12,
      price: 599,
      cost: 420,
    },
    {
      name: "Chino Pants",
      quantity: 32,
      soldToday: 8,
      price: 799,
      cost: 560,
    },
  ];

  return (
    <div className="landing-page">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="flickr-landing">
        <div className="flickr-content">
          <span className="hero-badge animate-badge">{TAGLINE}</span>

          <h1 className="flickr-title">
            Smarter Retail Starts with{" "}
            <span className="heading typing-text">{typedText}</span>
          </h1>

          <p className="hero-subtitle">
            Predict demand. Reduce waste. Act on data with confidence.
          </p>

          <p className="flickr-support">
            Vector AI is an AI-driven retail management platform that
            optimizes inventory, and delivers real-time insights to
            help retailers run smarter operations.
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

      {/* ================= PRODUCT SHOWCASE ================= */}
      <section className="section product-showcase">
        <div className="showcase-grid">
          {/* LEFT */}
          <div className="showcase-left">
            <h2 className="section-title">
              How Vector AI Helps Retailers Make Smarter Decisions
            </h2>

            <p className="showcase-text">
              Vector AI analyzes your store’s sales and inventory data to
              highlight slow-moving products and suggest practical actions that
              improve profitability — without changing your existing workflow.
            </p>

            <ul className="showcase-points">
              <li>✔ Identifies products that block capital in inventory</li>
              <li>✔ Suggests smart bundle offers to clear dead stock</li>
              <li>✔ Helps retailers act faster with data-backed decisions</li>
            </ul>

            <div className="showcase-stats">
              <div className="stat-card">
                <strong>40%</strong>
                <span>Faster Inventory Movement</span>
              </div>
              <div className="stat-card">
                <strong>18%</strong>
                <span>Improvement in Monthly Revenue</span>
              </div>
            </div>
          </div>

          {/* RIGHT – DASHBOARD PREVIEW */}
          <div className="showcase-right">
            <div className="dashboard-card">
              {/* ✅ SAME DASHBOARD GRAPH */}
              <div className="chart-box landing-chart">
                <Analytics stock={demoStock} />
              </div>

              <h4 className="dashboard-title">Vector AI – Feature Preview</h4>

              <div className="bundle-item">
                <span>Men’s Cotton Shirt (Blue)</span>
                <span>48 units · ₹599</span>
              </div>

              <div className="bundle-plus">+</div>

              <div className="bundle-item">
                <span>Chino Pants (Navy)</span>
                <span>32 units · ₹799</span>
              </div>

              <div className="bundle-result">
                <strong>Suggested Bundle: ₹899</strong>
                <span>
                  Based on sales trends · Estimated clearance: 45 bundles /
                  month
                </span>
              </div>

              <div className="bundle-actions">
                <button className="approve-btn">Apply in Dashboard</button>
                <button className="ghost-btn">Review Logic</button>
              </div>

              <p className="demo-note">
                Feature preview shown for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY RETAILVISION ================= */}
      <section className="section alt-section">
        <h2 className="section-title">Why Vector AI?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>Built for Indian Retail</h3>
            <p>
              Designed specifically for retailers with real-world workflows and
              practical use cases.
            </p>
          </div>

          <div className="why-card">
            <h3>AI-Driven Insights</h3>
            <p>
              Make smarter decisions using AI-powered forecasting and analytics
              - not guesswork.
            </p>
          </div>

          <div className="why-card">
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
        <h2 className="section-title">Who Is Vector AI For?</h2>

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

          <div className="info-card">
            <h3>Business Owners</h3>
            <p>
              Track overall performance, profitability, and growth metrics
              across stores from a single dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section alt-section">
        <h2 className="section-title">About Vector AI</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>What We Do</h3>
            <p>{BRAND_DESCRIPTION}</p>
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
              Empower retailers with enterprise-level tools to compete
              confidently in a digital-first retail ecosystem.
            </p>
          </div>

          <div className="info-card">
            <h3>How It Works</h3>
            <p>
              Vector AI connects sales and inventory data to generate insights,
              forecasts, and recommendations — all in real time.
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
        © 2026 Vector AI • Built for Innovation
      </footer>
    </div>
  );
}

export default Landing;
