import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import salonImage from "../../Assets/loginImage.png";
import "./CustomerLogin.css";

export default function CustomerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    // After successful login:
    // navigate('/dashboard');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      {/* Image Section */}
      <div 
        className="login-image-section" 
        style={{ backgroundImage: `url(${salonImage})` }}
      >
        <div className="login-image-overlay"></div>
        <div className="login-image-content">
          <div className="login-logo">SALOFRESH</div>
          <h2 className="login-image-title">
            Elevate Your Beauty Experience
          </h2>
          <p className="login-image-description">
            Discover the perfect beauty services tailored just for you from our network of professional salons.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="login-form-section">
        <div className="login-card">
          <a  className="logo-3d">
            <span className="logo-text">SALOFRESH</span>
            <span className="logo-reflection"></span>
          </a>
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-subheading">Sign in to Book your Appointment</p>

          <form onSubmit={handleLogin}>
            <label className="login-label">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="login-input"
              required
            />

            <label className="login-label">Password</label>
            <div className="login-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="login-input"
                required
              />
              <span className="login-eye-icon" onClick={togglePassword}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="login-forgot" onClick={handleForgotPassword}>
              Forgot Password?
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <p className="login-signup-text">
            Don't have an account?
            <span className="login-link" onClick={handleSignUp}>
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}