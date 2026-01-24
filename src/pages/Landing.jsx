import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // prevent scroll ONLY on landing
    document.body.style.overflow = "hidden";

    return () => {
      // IMPORTANT: restore scroll for other pages
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleContinue = () => {
    localStorage.removeItem("role"); // safer than forcing admin
    navigate("/login");
  };

return (
  <div className="landing-page">


    <section className="flickr-landing">
      <div className="flickr-overlay"></div>

      <div className="flickr-content">
        <h1 className="flickr-title animate-title">
          Welcome <span className="heading">RetailVision</span>
        </h1>
    

        <p className="flickr-tagline animate-tagline">
          Smarter inventory. Clearer decisions.
        </p>

        <p className="flickr-support animate-support heading">
          AI-powered demand forecasting, inventory optimization,
          and actionable insights for modern retail teams.
        </p>
      

        <button
          className="flickr-cta-group animate-cta"
          onClick={handleContinue}
        >
          Continue to Login
        </button>

        <button
          className="flickr-cta-group animate-cta"
          onClick={() => navigate("signup")}
        >
          Create an Account
        </button>
        
      </div>
    </section>
    <footer className="footer">© 2026 RetailVision • Privacy • Terms
</footer>
  </div>
);

}

export default Landing;
