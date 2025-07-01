import React, { useState, useEffect } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useNavigate } from "react-router-dom";

// Dummy service data
const dummyServices = [
  {
    id: 1,
    name: "Premium Haircut",
    description: "Professional haircut with styling consultation",
    rating: 4.9,
    price: 45,
    duration: "45 min",
    category: "Hair",
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    description: "Full-body therapeutic massage",
    rating: 4.8,
    price: 85,
    duration: "60 min",
    category: "Massage",
  },
  {
    id: 3,
    name: "Manicure & Gel Polish",
    description: "Full manicure with gel polish application",
    rating: 4.7,
    price: 35,
    duration: "50 min",
    category: "Nails",
  },
  {
    id: 4,
    name: "Facial Treatment",
    description: "Luxury facial with organic products",
    rating: 4.9,
    price: 70,
    duration: "75 min",
    category: "Skincare",
  },
];

// Dummy categories
const dummyCategories = [
  { id: 1, name: "Hair", icon: "✂️" },
  { id: 2, name: "Nails", icon: "💅" },
  { id: 3, name: "Massage", icon: "💆" },
  { id: 4, name: "Skincare", icon: "🧖" },
  { id: 5, name: "Waxing", icon: "🧴" },
];

// Simulated API service
const fakeApi = {
  fetchServices: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(dummyServices), 800);
    }),

  fetchCategories: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(dummyCategories), 500);
    }),

  searchServices: (query) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const results = dummyServices.filter((service) =>
          service.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 600);
    }),
};

// Main Page Component
export default function FreshaMainPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, categoriesData] = await Promise.all([
          fakeApi.fetchServices(),
          fakeApi.fetchCategories(),
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await fakeApi.searchServices(searchQuery);
      setServices(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = async () => {
    setSearchQuery("");
    setLoading(true);
    try {
      const servicesData = await fakeApi.fetchServices();
      setServices(servicesData);
    } catch (error) {
      console.error("Reset failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="salofresh-container">
      {/* Header */}
      <header className="app-header">
        {/* Floating background elements */}
        <div className="header-shapes">
          <div className="header-shape shape-1"></div>
          <div className="header-shape shape-2"></div>
        </div>

        <div className="header-container">
          {/* Left-aligned logo with 3D effect */}
          <a href="/" className="logo-3d">
            <span className="logo-text">SALOFRESH</span>
            <span className="logo-reflection"></span>
          </a>

          {/* Right-aligned navigation */}
          <nav className="header-nav">
            {/* Desktop menu items */}
            <div className="desktop-menu">
              <button className="nav-btn nav-business">
                <span>LogIn</span>
                <div className="btn-hover-3d"></div>
              </button>
              <button className="nav-btn nav-login">
                <span>Business Login</span>
                <div className="btn-hover-3d"></div>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
              <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
              <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
            </div>

            {/* Mobile menu dropdown */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
              <button className="mobile-nav-btn">List Your Business</button>
              <button className="mobile-nav-btn">Business Login</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Floating 3D Elements */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-gradient">Book Beauty & Wellness</span>
            <span className="title-pop">Instantly</span>
          </h1>
          <p className="hero-subtitle">
            Discover and book appointments with the best local professionals
          </p>

          {/* Search Form with 3D Effect */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="input-highlight"></div>
            </div>
            <button type="submit" className="search-btn">
              <span>Search</span>
              <div className="btn-hover-effect"></div>
            </button>
            {searchQuery && (
              <button type="button" onClick={resetSearch} className="reset-btn">
                <i className="clear-icon"></i>
              </button>
            )}
          </form>
        </div>

        {/* 3D Floating Icons */}
        <div className="floating-icons">
          <div className="icon spa-icon"></div>
          <div className="icon hair-icon"></div>
          <div className="icon nail-icon"></div>
        </div>
      </section>

      {/* hero section end here */}

      {/* Categories section start*/}
      <section className="categories">
        {/* Floating background elements */}
        <div className="category-shapes">
          <div className="category-shape shape-1"></div>
          <div className="category-shape shape-2"></div>
        </div>

        <h2 className="category-title">
          <span className="title-text">Popular</span>
          <span className="title-accent">Categories</span>
        </h2>

        <div className="category-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            >
              <div className="category-icon-container">
                <div className="category-icon-bg"></div>
                <div className="category-icon">{category.icon}</div>
                <div className="icon-reflection"></div>
              </div>
              <span className="category-name">{category.name}</span>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>
      {/* catrgories section end here */}
      {/* Services Listing */}
      <section className="services">
        <h2 className="section-title">Recommended Services</h2>

        {loading ? (
          <div className="loader">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="no-results">
            <p>No services found. Try another search.</p>
            <button onClick={resetSearch}>Show All Services</button>
          </div>
        ) : (
          <div className="service-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="card-image">
                  <img
                    //src={`https://source.unsplash.com/random/300x200/?${service.category.toLowerCase()}`}
                    src={`https://d16a6xzchwrohg.cloudfront.net/franchisebanner/1.webp`}
                    alt={service.name}
                  />
                  <div className="category-badge">{service.category}</div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="salon-name">{service.name}</h3>
                    <div className="rating-badge">
                      ⭐ {service.rating}
                      <span className="rating-count">(128)</span>
                    </div>
                  </div>
                  <div className="location">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>123 Beauty St, {service.category} District</span>
                  </div>
                  <div className="price-duration">
                    <span className="price">${service.price}</span>
                    <span className="duration">{service.duration}</span>
                  </div>
                  <div className="card-footer">
                    <button className="book-btn">Book Now</button>
                    <button className="favorite-btn">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New to salofresh store */}
        {/* Services Listing */}
        <section className="salofresh-services">
          <h2 className="salofresh-section-title">New to Salofresh</h2>

          {loading ? (
            <div className="salofresh-loader">
              Discovering fresh services...
            </div>
          ) : services.length === 0 ? (
            <div className="salofresh-no-results">
              <p>No services found. Try another search.</p>
              <button className="salofresh-reset-btn" onClick={resetSearch}>
                Show All
              </button>
            </div>
          ) : (
            <div className="salofresh-grid">
              {services.map((service) => (
                <div key={service.id} className="salofresh-card">
                  {/* 3D Card Wrapper */}
                  <div className="salofresh-card-inner">
                    {/* Front Side */}
                    <div className="salofresh-card-front">
                      <div className="salofresh-image-container">
                        <img
                          //src={`https://source.unsplash.com/random/400x300/?salon,${service.category.toLowerCase()}`}
                          src={`data:image/jpeg;base64,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`}
                          alt={service.name}
                          className="salofresh-service-image"
                        />
                        <div className="salofresh-new-badge">NEW</div>
                        <div className="salofresh-category-tag">
                          {service.category}
                        </div>
                      </div>

                      <div className="salofresh-card-content">
                        <div className="salofresh-service-header">
                          <h3 className="salofresh-service-name">
                            {service.name}
                          </h3>
                          <div className="salofresh-rating">
                            ⭐ {service.rating}{" "}
                            <span>({Math.floor(Math.random() * 50) + 10})</span>
                          </div>
                        </div>

                        <div className="salofresh-location">
                          <span className="salofresh-location-icon">📍</span>
                          <span>Salofresh {service.category} Center</span>
                        </div>

                        <div className="salofresh-price-section">
                          <span className="salofresh-price">
                            ${service.price}
                          </span>
                          <span className="salofresh-duration">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Visible on hover */}
                    <div className="salofresh-card-back">
                      <div className="salofresh-back-content">
                        <h4>Service Details</h4>
                        <p>{service.description}</p>
                        <div className="salofresh-highlights">
                          <span>✨ Professional Staff</span>
                          <span>✨ Premium Products</span>
                          <span>✨ Sanitized Tools</span>
                        </div>
                        <button className="salofresh-book-now">
                          Book Instantly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* trending on salofresh start */}

        {/* Combined Sections */}
        <div className="salofreshCombined-container">
          {/* New to Salofresh Section */}
          <section className="salofresh-new-section">
            <h2 className="salofresh-section-title">New to Salofresh</h2>

            {loading ? (
              <div className="salofresh-loader">
                Discovering fresh services...
              </div>
            ) : services.length === 0 ? (
              <div className="salofresh-no-results">
                <p>No services found. Try another search.</p>
                <button className="salofresh-reset-btn" onClick={resetSearch}>
                  Show All
                </button>
              </div>
            ) : (
              <div className="salofresh-grid">
                {services.slice(0, 4).map((service) => (
                  <div key={`new-${service.id}`} className="salofresh-card-new">
                    <div className="salofresh-card-inner">
                      <div className="salofresh-card-front-new">
                        <div className="salofresh-image-container">
                          <img
                            //src={`https://source.unsplash.com/random/400x300/?salon-new,${service.category.toLowerCase()}`}
                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-LEJ7x7zQINXtSWquSTaFKdOUguN2-AgpA&s`}
                            alt={service.name}
                          />
                          <div className="salofresh-new-badge">NEW</div>
                          <div className="salofresh-category-tag">
                            {service.category}
                          </div>
                        </div>

                        <div className="salofresh-card-content">
                          <div className="salofresh-service-header">
                            <h3>{service.name}</h3>
                            <div className="salofresh-rating">
                              ⭐ {service.rating}{" "}
                              <span>
                                ({Math.floor(Math.random() * 50) + 10})
                              </span>
                            </div>
                          </div>

                          <div className="salofresh-location">
                            <span>📍</span>
                            <span>Salofresh {service.category} Center</span>
                          </div>

                          <div className="salofresh-price-section">
                            <span className="salofresh-price">
                              ${service.price}
                            </span>
                            <span className="salofresh-duration">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="salofresh-card-back-new">
                        <div className="salofresh-back-content">
                          <h4>Service Details</h4>
                          <p>{service.description}</p>
                          <div className="salofresh-highlights">
                            <span>✨ Professional Staff</span>
                            <span>✨ Premium Products</span>
                            <span>✨ Sanitized Tools</span>
                          </div>
                          <button className="salofresh-book-now">
                            Book Instantly
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Trending on Salofresh Section */}
          <section className="salofresh-trending-section">
            <h2 className="salofresh-section-title trending-title">
              Trending on Salofresh
            </h2>

            {loading ? (
              <div className="salofresh-loader">
                Loading trending services...
              </div>
            ) : services.length === 0 ? (
              <div className="salofresh-no-results">
                <p>No trending services found</p>
              </div>
            ) : (
              <div className="salofresh-grid trending-grid">
                {services.slice(2, 6).map((service) => (
                  <div
                    key={`trending-${service.id}`}
                    className="salofresh-card-trending"
                  >
                    <div className="salofresh-card-inner">
                      <div className="salofresh-card-front-trending">
                        <div className="salofresh-image-container">
                          <img
                            // src={`https://source.unsplash.com/random/400x300/?salon-popular,${service.category.toLowerCase()}`}
                            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8bpRsNAY1wRBigHvMxF1CEhGXpc5tNTz4g&s`}
                            alt={service.name}
                          />
                          <div className="salofresh-trending-badge">
                            TRENDING
                          </div>
                          <div className="salofresh-category-tag">
                            {service.category}
                          </div>
                          <div className="salofresh-fire-icon">🔥</div>
                        </div>

                        <div className="salofresh-card-content">
                          <div className="salofresh-service-header">
                            <h3>{service.name}</h3>
                            <div className="salofresh-rating trending-rating">
                              ⭐ {service.rating}{" "}
                              <span>
                                ({Math.floor(Math.random() * 100) + 50})
                              </span>
                            </div>
                          </div>

                          <div className="salofresh-location">
                            <span>📍</span>
                            <span>Salofresh {service.category} Center</span>
                          </div>

                          <div className="salofresh-price-section">
                            <span className="salofresh-price">
                              ${service.price}
                            </span>
                            <span className="salofresh-duration">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="salofresh-card-back-trending">
                        <div className="salofresh-back-content">
                          <h4>Why It's Trending</h4>
                          <p>{service.description}</p>
                          <div className="salofresh-stats">
                            <div className="stat-item">
                              <span className="stat-number">
                                {Math.floor(Math.random() * 500) + 100}
                              </span>
                              <span className="stat-label">
                                Booked This Week
                              </span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-number">
                                {Math.floor(Math.random() * 90) + 10}%
                              </span>
                              <span className="stat-label">
                                Positive Reviews
                              </span>
                            </div>
                          </div>
                          <button className="salofresh-book-now trending-book-btn">
                            Join The Trend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* trending on salofresh end */}

        {/* review section start */}

        {/* review section end */}
      </section>

      {/* Footer */}
      <footer>
        <p>© 2023 Fresha. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">For Businesses</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}
