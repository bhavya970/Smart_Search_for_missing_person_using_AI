import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./../Home/Home.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        className="carousel-section"
      >
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row",margin:"10px 0px" }}>
        <div style={{ background: "linear-gradient(4deg, black, #710707)", borderRadius: "8px", height: "450px", width: "100vw", display: "flex", flexDirection:"column",alignItems: "center", justifyContent: "space-around" ,padding:"36px 100px"}}>
          <h1 style={{ color:"white",fontSize:"2.6rem",fontWeight:"800",marginBottom: 24 }}>About Us</h1>
          <h3 style={{ fontSize: "1.4rem",color:"white", fontWeight: "400" ,marginBottom: 16 }}>
            Welcome to <strong>AI Missing Person Finder</strong>, a collaborative
            platform for families, law enforcement, and the public to help
            identify and reunite missing persons.
          </h3>
          <p style={{ fontSize: "1.1rem",color:"white", fontWeight: "300" }}>
            Our mission is to leverage artificial intelligence and community
            support to bring loved ones back home. By combining advanced face
            recognition technology with collective participation, we make the
            search faster, more accurate, and impactful.
          </p>
        </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        style={{
          padding: "48px 0",
          background: "#f4f8fc",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#4a90e2" }}>Our Values</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginTop: "32px",
              flexWrap: "wrap",
              color:"black"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: "32px 24px",
                width: "260px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "2.5rem", color: "#4a90e2" }}>🛡️</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "400", marginTop: 32 }}>Trust</h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "300",marginTop:24 }}>Ensuring security, privacy, and reliability in every step.</p>
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: "32px 24px",
                width: "260px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "2.5rem", color: "#4a90e2" }}>🤝</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "400", marginTop: 16 }}>Community</h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "300",marginTop:24 }}>
                Bringing families, the public, and law enforcement together
                for a united cause.
              </p>
            </div>
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: "32px 24px",
                width: "260px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "2.5rem", color: "#4a90e2" }}>💡</span>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "400", marginTop: 16 }}>Innovation</h3>
              <p style={{ fontSize: "1.2rem", fontWeight: "300",marginTop:24 }}>
                Using AI-powered image recognition to accelerate the search
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "32px 0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "300",marginTop:24 }}>
            Subscribe to get updates, important news, and alerts about missing
            persons.
          </p>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              margin: "16px 0",
            }}
          >
            <input
              type="email"
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
              placeholder="Your email"
            />
            <button
              type="submit"
              style={{
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginTop:"6px",
                height:"40px",
                padding: "8px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "400", marginTop: 16 }}>
            &copy; {new Date().getFullYear()} AI Missing Person Finder. All rights
            reserved.
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default About;