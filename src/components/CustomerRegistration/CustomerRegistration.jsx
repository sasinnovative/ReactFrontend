import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import salonImage from "../../Assets/loginImage.png";
import "./CustomerRegistration.css";

export default function CustomerRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (field) => {
    if (field === 'password') setShowPassword(!showPassword);
    if (field === 'confirmPassword') setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your signup logic here
    // After successful signup:
    // navigate('/dashboard');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      {/* Image Section */}
      <div 
        className="signup-image-section" 
        style={{ backgroundImage: `url(${salonImage})` }}
      >
        <div className="signup-image-overlay"></div>
        <div className="signup-image-content">
          <div className="signup-logo">SALOFRESH</div>
          <h2 className="signup-image-title">
            Elevate Your Beauty Experience
          </h2>
          <p className="signup-image-description">
            Discover the perfect beauty services tailored just for you from our network of professional salons.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="signup-form-section">
        <div className="signup-card">
          <a href="/" className="logo-3d">
            <span className="logo-text">SALOFRESH</span>
            <span className="logo-reflection"></span>
          </a>
          <h1 className="signup-heading">Create Account</h1>
          <p className="signup-subheading">Join us to start your beauty journey</p>

          <form onSubmit={handleSignUp}>
            <label className="signup-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="signup-input"
              required
            />

            <label className="signup-label">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="signup-input"
              required
            />

            <label className="signup-label">Password</label>
            <div className="signup-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="signup-input"
                required
              />
              <span 
                className="signup-eye-icon" 
                onClick={() => togglePassword('password')}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <label className="signup-label">Confirm Password</label>
            <div className="signup-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="signup-input"
                required
              />
              <span 
                className="signup-eye-icon" 
                onClick={() => togglePassword('confirmPassword')}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>

          <p className="signup-login-text">
            Already have an account?
            <span className="signup-link" onClick={handleLoginRedirect}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}