import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Analytics from "../components/Analytics";
import Footer from "../components/Footer";
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
  ArrowRight,
  Play
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
        <div className="flickr-content fade-in">
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
              Get Started <ArrowRight size={18} />
            </button>
            <button
              className="cta-secondary"
              onClick={() => navigate("/signup")}
            >
              <Play size={18} /> View Demo
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-card delay-1">
              <strong className="numeric">~30%</strong>
              <span>Faster Billing</span>
            </div>
            <div className="trust-card delay-2">
              <strong className="numeric">~25%</strong>
              <span>Fewer Errors</span>
            </div>
            <div className="trust-card delay-3">
              <strong className="numeric">2×</strong>
              <span>Sales Visibility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section fade-in">
        <h2 className="section-title">Key Features</h2>

        <div className="card-grid">
          <div className="info-card delay-1">
            <div className="feature-icon">
              <TrendingUp size={26} />
            </div>
            <h3>AI Demand Forecasting</h3>
            <p>Predict demand & avoid stockouts with high-precision AI models.</p>
          </div>

          <div className="info-card delay-2">
            <div className="feature-icon">
              <Boxes size={26} />
            </div>
            <h3>Smart Inventory</h3>
            <p>Real-time stock insights & automated low-stock alerts.</p>
          </div>

          <div className="info-card delay-3">
            <div className="feature-icon">
              <BarChart3 size={26} />
            </div>
            <h3>Sales Analytics</h3>
            <p>Turn complex sales data into actionable business decisions.</p>
          </div>

          <div className="info-card delay-1">
            <div className="feature-icon">
              <LayoutDashboard size={26} />
            </div>
            <h3>Unified Dashboard</h3>
            <p>Monitor your entire retail operation from a single interface.</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE ================= */}
      <section className="section product-showcase fade-in">
        <div className="showcase-grid">
          <div className="showcase-left">
            <h2 className="section-title" style={{ textAlign: 'left', left: '0', transform: 'none' }}>
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
                <strong className="numeric" style={{ fontSize: '2.5rem', display: 'block', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>~40%</strong>
                <span>Faster Inventory Movement</span>
              </div>
              <div className="stat-card">
                <strong className="numeric" style={{ fontSize: '2.5rem', display: 'block', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>~18%</strong>
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
      <section className="section fade-in">
        <h2 className="section-title">Who Is It For?</h2>

        <div className="card-grid">
          <div className="info-card delay-1">
            <h3>Shop Owners</h3>
            <p>Complete visibility over sales & stock performance across all your business locations.</p>
          </div>

          <div className="info-card delay-2">
            <h3>Store Staff</h3>
            <p>Faster billing with fewer mistakes and instant inventory lookups at your fingertips.</p>
          </div>

          <div className="info-card delay-3">
            <h3>Managers</h3>
            <p>Real-time performance tracking and automated reports for data-driven management.</p>
          </div>

          <div className="info-card delay-1">
            <h3>Business Owners</h3>
            <p>Enterprise-grade intelligence to scale your business and outpace the competition.</p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section alt-section fade-in">
        <h2 className="section-title">About Vector AI</h2>

        <div className="card-grid">
          <div className="info-card delay-1">
            <h3>What We Do</h3>
            <p>{BRAND_DESCRIPTION}</p>
          </div>

          <div className="info-card delay-2">
            <h3>Why We Exist</h3>
            <p>To replace guesswork with intelligence, helping small to large retailers thrive.</p>
          </div>

          <div className="info-card delay-3">
            <h3>Our Vision</h3>
            <p>Making enterprise-grade tools accessible to every retailer world-wide.</p>
          </div>

          <div className="info-card delay-1">
            <h3>How It Works</h3>
            <p>Connect your sales + inventory data to get real-time insights and automated actions.</p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section contact-highlight fade-in">
        <div className="info-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '30px' }}>Contact Us</h2>
          <p className="section-text" style={{ marginBottom: '40px' }}>
            Ready to transform your retail business with AI? Get in touch with our team today.
          </p>

          <form className="contact-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <input type="text" placeholder="Your Name" style={{ margin: '0' }} />
              <input type="email" placeholder="Your Email" style={{ margin: '0' }} />
            </div>
            <textarea placeholder="Your Message" style={{ width: '100%', marginBottom: '20px', minHeight: '120px' }}></textarea>
            <button className="cta-primary" style={{ width: '100%', justifyContent: 'center' }} type="submit">Send Message <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Landing;
