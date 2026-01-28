import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import {
  BRAND_NAME,
  TAGLINE,
  BRAND_DESCRIPTION,
} from "../config/brand";
import {
  TrendingUp,
  Boxes,
  BarChart3,
  LayoutDashboard,
} from "lucide-react";

function Landing({ toggleTheme, theme }) {
  const navigate = useNavigate();
  const fullText = BRAND_NAME;

  /* ===== TYPING LOGIC ===== */
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  /* ===== DEMO STOCK ===== */
  const demoStock = [
    { name: "Men Shirt", quantity: 48, soldToday: 12, price: 599, cost: 420 },
    { name: "Chino Pants", quantity: 32, soldToday: 8, price: 799, cost: 560 },
  ];

  return (
    <div className="landing-page">
      <Navbar toggleTheme={toggleTheme} />

      {/* ================= HERO ================= */}
      <section className="flickr-landing">
        <div className="flickr-content">
          <span className="hero-badge">{TAGLINE}</span>

          <h1 className="flickr-title">
            Retail Intelligence, Powered by{" "}
            <span className="heading typing-text">{typedText}</span>
          </h1>

          <p className="hero-subtitle">
            Predict demand. Reduce waste. Act with confidence.
          </p>

          <p className="flickr-support">
            AI-powered retail intelligence that helps you sell smarter,
            manage inventory better, and make faster decisions.
          </p>

          <div className="landing-cta">
            <button className="cta-primary" onClick={() => navigate("/login")}>
              Get Started
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
              <strong className="numeric">~30%</strong>
              <span>Faster Billing</span>
            </div>
            <div className="trust-card">
              <strong className="numeric">~25%</strong>
              <span>Fewer Errors</span>
            </div>
            <div className="trust-card">
              <strong className="numeric">2×</strong>
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
            <TrendingUp size={26} className="feature-icon" />
            <h3>AI Demand Forecasting</h3>
            <p>Predict demand & avoid stockouts.</p>
          </div>

          <div className="info-card">
            <Boxes size={26} className="feature-icon" />
            <h3>Smart Inventory</h3>
            <p>Real-time stock insights & alerts.</p>
          </div>

          <div className="info-card">
            <BarChart3 size={26} className="feature-icon" />
            <h3>Sales Analytics</h3>
            <p>Turn sales data into decisions.</p>
          </div>

          <div className="info-card">
            <LayoutDashboard size={26} className="feature-icon" />
            <h3>Unified Dashboard</h3>
            <p>Everything in one place.</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE ================= */}
      <section className="section product-showcase">
        <div className="showcase-grid">
          <div className="showcase-left">
            <h2 className="section-title">
              Decisions powered by real retail data
            </h2>

            <p className="showcase-text">
              Vector AI analyzes your sales and inventory to highlight
              opportunities, reduce dead stock, and improve profitability —
              without disrupting your workflow.
            </p>

            <ul className="showcase-points">
              <li>✔ Detects slow-moving inventory</li>
              <li>✔ Suggests smart bundle offers</li>
              <li>✔ Enables faster data-backed actions</li>
            </ul>

            <div className="showcase-stats">
              <div className="stat-card">
                <strong className="numeric">~40%</strong>
                <span>Faster Inventory Movement</span>
              </div>
              <div className="stat-card">
                <strong className="numeric">~18%</strong>
                <span>Revenue Growth</span>
              </div>
            </div>
          </div>

          <div className="showcase-right">
            <div className="dashboard-card">
              <div className="chart-box landing-chart">
                <Analytics stock={demoStock} theme={theme} />
              </div>

              <h4 className="dashboard-title">
                Vector AI — Live Feature Preview
              </h4>

              <div className="bundle-item">
                <span>Men’s Cotton Shirt</span>
                <span>
                  <span className="numeric">48</span> units · ₹
                  <span className="numeric">599</span>
                </span>
              </div>

              <div className="bundle-plus">+</div>

              <div className="bundle-item">
                <span>Chino Pants</span>
                <span>
                  <span className="numeric">32</span> units · ₹
                  <span className="numeric">799</span>
                </span>
              </div>

              <div className="bundle-result">
                <strong>
                  Suggested Bundle: ₹
                  <span className="numeric">899</span>
                </strong>
                <span>
                  Estimated clearance:{" "}
                  <span className="numeric">45</span> bundles / month
                </span>
              </div>

              <div className="bundle-actions">
                <button className="approve-btn">Apply in Dashboard</button>
                <button className="ghost-btn">Review Logic</button>
              </div>

              <p className="demo-note">
                Feature preview for demonstration only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= USERS ================= */}
      <section className="section">
        <h2 className="section-title">Who Is It For?</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>Shop Owners</h3>
            <p>Complete visibility over sales & stock.</p>
          </div>

          <div className="info-card">
            <h3>Store Staff</h3>
            <p>Faster billing with fewer mistakes.</p>
          </div>

          <div className="info-card">
            <h3>Managers</h3>
            <p>Real-time performance tracking.</p>
          </div>

          <div className="info-card">
            <h3>Business Owners</h3>
            <p>Monitor growth across locations.</p>
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
            <p>To replace guesswork with intelligence.</p>
          </div>

          <div className="info-card">
            <h3>Our Vision</h3>
            <p>Enterprise-grade tools for every retailer.</p>
          </div>

          <div className="info-card">
            <h3>How It Works</h3>
            <p>Sales + Inventory → Insights → Action.</p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section contact-highlight">
        <h2 className="section-title">Contact Us</h2>

        <p className="section-text">
          Want to explore Vector AI for your business?
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
        © <span className="numeric">2026</span> Vector AI • Built for Innovation
      </footer>
    </div>
  );
}

export default Landing;
