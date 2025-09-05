import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "./ms-1.jpg", // Image 1 from public folder
    "./ms-2.webp", // Image 2 from public folder
    "./ms-3.jpg", // Image 3 from public folder
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://18.222.131.4:8000/get-user-details",
        payload
      );

      if (response.data.status === "success") {
        navigate("/home");
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      navigate("/home");

      if (error.response) {
        setError(error.response.data.message || "Invalid username or password");
      } else {
        setError("Invalid username or password");
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

      {/* Right side: Login form */}
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
        <div
          style={{
            width: "80%",
            maxWidth: "400px",
            marginBottom: "30px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "15px",
            boxShadow: "0 4px 12px rgba(31, 38, 135, 0.18)",
            padding: "20px 10px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2rem", color: "#4a90e2", margin: 0 }}>
            AI Missing Person Matcher
          </h1>
          <p style={{ color: "#333", fontSize: "1rem", margin: "10px 0 0 0" }}>
            Secure Login
          </p>
        </div>
        {isLoggedIn ? (
          <h2>Welcome, {username}!</h2>
        ) : (
          <form
            onSubmit={handleLogin}
            style={{
              width: "80%",
              maxWidth: "400px",
              backgroundColor: "rgb(193 192 192)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
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
              />
            </div>
            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}
            <button
              type="submit"
              onClick={() => navigate("/home")}
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
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
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
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
