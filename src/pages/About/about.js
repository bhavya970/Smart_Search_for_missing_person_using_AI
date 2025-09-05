import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* ✅ Keep your original Navbar but styled */}
      <nav
        className="navbar"
        style={{
          marginBottom: "0",
          backgroundColor: "#212529",
          padding: "12px 20px",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            margin: 0,
            padding: 0,
          }}
        >
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/home")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            Home
          </li>
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/about")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            About
          </li>
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/upload")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
            Upload
          </li>
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/matches")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
           Matches
          </li>
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/faqs")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
          Faqs
          </li>
          <li
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.3s",
            }}
            onClick={() => navigate("/logout")}
            onMouseOver={(e) => (e.target.style.color = "#28a745")}
            onMouseOut={(e) => (e.target.style.color = "#fff")}
          >
          Logout
          </li>
        </ul>
      </nav>

      {/* ✅ Hero Section */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h1 className="mb-4">About Us</h1>
          <p className="lead">
            Welcome to <strong>AI Missing Person Finder</strong>, a collaborative
            platform for families, law enforcement, and the public to help
            identify and reunite missing persons.
          </p>
          <p>
            Our mission is to leverage artificial intelligence and community
            support to bring loved ones back home. By combining advanced face
            recognition technology with collective participation, we make the
            search faster, more accurate, and impactful.
          </p>
        </div>
      </section>

      {/* ✅ Our Values Section */}
      <section className="py-5 bg-success-subtle">
        <div className="container text-center">
          <h2>Our Values</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-4 shadow-lg border-0 transition-hover">
                <i className="bi bi-shield-lock display-4 text-primary"></i>
                <h5 className="mt-3">Trust</h5>
                <p>Ensuring security, privacy, and reliability in every step.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-lg border-0 transition-hover">
                <i className="bi bi-people display-4 text-primary"></i>
                <h5 className="mt-3">Community</h5>
                <p>
                  Bringing families, the public, and law enforcement together
                  for a united cause.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow-lg border-0 transition-hover">
                <i className="bi bi-lightbulb display-4 text-primary"></i>
                <h5 className="mt-3">Innovation</h5>
                <p>
                  Using AI-powered image recognition to accelerate the search
                  process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>
            Subscribe to get updates, important news, and alerts about missing
            persons.
          </p>
          <form className="row g-2 justify-content-center">
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-success">
                Subscribe
              </button>
            </div>
          </form>
          <p className="mt-3">
            &copy; {new Date().getFullYear()} AI Missing Person Finder. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;

