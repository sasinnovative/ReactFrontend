import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import salonImage from "../../Assets/loginImage.png"; // Use the same image
import "./CustomerPasswordReset.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    // After successful reset:
    // navigate('/login');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="reset-container">
      {/* Image Section */}
      <div 
        className="reset-image-section" 
        style={{ backgroundImage: `url(${salonImage})` }}
      >
        <div className="reset-image-overlay"></div>
        <div className="reset-image-content">
          <div className="reset-logo">SALOFRESH</div>
          <h2 className="reset-image-title">
            Elevate Your Beauty Experience
          </h2>
          <p className="reset-image-description">
            Discover the perfect beauty services tailored just for you from our network of professional salons.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="reset-form-section">
        <div className="reset-card">
          <a href="/" className="logo-3d">
            <span className="logo-text">SALOFRESH</span>
            <span className="logo-reflection"></span>
          </a>
          <h1 className="reset-heading">Reset Password</h1>
          <p className="reset-subheading">Enter your email to reset your password</p>

          <form onSubmit={handleResetPassword}>
            <label className="reset-label">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="reset-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </form>

          <p className="reset-login-text">
            Remembered your password?
            <span className="reset-link" onClick={handleLoginRedirect}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}