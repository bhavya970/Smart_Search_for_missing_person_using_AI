import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const carouselImages = [
    "./ms-1.jpg", // Image 1 from public folder
    "./ms-2.webp", // Image 2 from public folder
    "./ms-3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://18.222.131.4:8000/register",
        payload
      );

      if (response.data.status === "User registered successfully!") {
        setError("");
        setIsRegistered(true);
        setTimeout(() => navigate("/login"), 1500);
      } else if (response.data.status === "Username or email already exists!") {
        setError("Username or email already exists!");
      } else {
        setError("Invalid registration details");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid registration details");
      } else {
        setError("Invalid registration details");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left side: Image carousel */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={carouselImages[currentImageIndex]}
            alt={`Carousel ${currentImageIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 1s ease-in-out",
            }}
          />
        </div>
      </div>

      {/* Right side: Signup form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isRegistered ? (
          <h2 style={{ color: "green" }}>Registration Successful!</h2>
        ) : (
          <form
            onSubmit={handleSignup}
            style={{
              width: "80%",
              maxWidth: "400px",
              backgroundColor: "rgb(193 192 192)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Sign Up
            </h2>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}
            <button
              type="submit"
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
