import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import salonImage from "../../Assets/loginImage.png";
import "./CustomerRegistration.css";
import {  API_URLS } from "../../constants";
import { BASE_URL } from "../../ApiUrls"

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const togglePassword = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    if (field === "confirmPassword") setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const [firstName, ...rest] = formData.fullName.trim().split(" ");
    const lastName = rest.pop() || "";
    const middleName = rest.join(" ");
    const userId = formData.email.split('@')[0] || "user";

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const payload = {
      firstName,
      middleName,
      lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      isActive: "active",
      userId,
    };

    try {
      const response = await fetch(`${BASE_URL}${API_URLS.CUSTOMER_REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        alert("Registration successful! Please check your email to verify your account.");
        navigate("/");
      } else {
        // Handle specific error cases
        if (response.status === 403) {
          setErrorMessage("Access denied. Please try again or contact support.");
        } else {
          setErrorMessage(
            responseData.message || 
            responseData.error ||
            `Registration failed (${response.status})`
          );
        }
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
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
            Discover the perfect beauty services tailored just for you from our
            network of professional salons.
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="signup-input"
              required
            />

            <label className="signup-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="signup-input"
              required
            />

            <label className="signup-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="signup-input"
              required
            />

            <label className="signup-label">Password</label>
            <div className="signup-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="signup-input"
                required
              />
              <span
                className="signup-eye-icon"
                onClick={() => togglePassword("password")}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <label className="signup-label">Confirm Password</label>
            <div className="signup-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="signup-input"
                required
              />
              <span
                className="signup-eye-icon"
                onClick={() => togglePassword("confirmPassword")}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {errorMessage && <p className="signup-error">{errorMessage}</p>}

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
