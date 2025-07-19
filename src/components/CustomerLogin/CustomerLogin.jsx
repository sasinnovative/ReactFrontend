import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import salonImage from "../../Assets/loginImage.png";
import {  API_URLS } from "../../constants";
import "./CustomerLogin.css";
import { BASE_URL } from "../../ApiUrls";

export default function CustomerLogin() {
  const [credentials, setCredentials] = useState({
    emailOrPhone: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!credentials.emailOrPhone.trim() || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const params = new URLSearchParams({
        emailOrPhone: credentials.emailOrPhone.trim(),
        password: credentials.password
      });

      const url = `${BASE_URL}${API_URLS.CUSTOMER_LOGIN}?${params}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        credentials: 'include'  // Include cookies for CORS
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate('/LandingPage');
      } else {
        // Handle specific HTTP errors
        if (response.status === 403) {
          setError("Access forbidden. Please contact support.");
        } else if (response.status === 401) {
          setError("Invalid credentials. Please try again.");
        } else {
          const errorText = await response.text();
          throw new Error(errorText || `Login failed with status ${response.status}`);
        }
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again later.");
      setCredentials(prev => ({ ...prev, password: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const handleSignUp = () => navigate('/register');
  const handleForgotPassword = () => navigate('/forgot-password');

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
          <a className="logo-3d">
            <span className="logo-text">SALOFRESH</span>
            <span className="logo-reflection"></span>
          </a>
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-subheading">Sign in to Book your Appointment</p>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label className="login-label">Email or Phone</label>
            <input
              name="emailOrPhone"
              type="text"
              placeholder="your@email.com or +1234567890"
              className="login-input"
              value={credentials.emailOrPhone}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            <label className="login-label">Password</label>
            <div className="login-input-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="login-input"
                value={credentials.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              <span 
                className={`login-eye-icon ${isLoading ? 'disabled' : ''}`} 
                onClick={!isLoading ? togglePassword : undefined}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div 
              className={`login-forgot ${isLoading ? 'disabled' : ''}`} 
              onClick={!isLoading ? handleForgotPassword : undefined}
            >
              Forgot Password?
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-spinner">
                  <span className="spinner-dot">•</span>
                  <span className="spinner-dot">•</span>
                  <span className="spinner-dot">•</span>
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="login-signup-text">
            Don't have an account?
            <span 
              className={`login-link ${isLoading ? 'disabled' : ''}`} 
              onClick={!isLoading ? handleSignUp : undefined}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}