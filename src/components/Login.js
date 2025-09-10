import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import e from "cors";

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
    // const payload = {
    //   email: emailInput.value,  // input field where user types email
    //   password: passwordInput.value
    // };

    try {
      const payload = { email, password };
      const response = await axios.post("http://localhost:5000/login", payload);
      console.log("Login Response:", response.data);
      if (response.status === 200) {  
        setUsername(response.data.username);
        setIsLoggedIn(true);
        setError("");
        setTimeout(() => {
    navigate("/home");
  }, 2000);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      // navigate("/home");
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "Invalid username or password");
      } else {
        setError("Invalid username or password");
        // alert(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw",display:"flex",flexDirection:"row",padding:"3% 5% 3% 2%", }}>
      {/* Left side: Image carousel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "end",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "90%",
            overflow: "hidden",
          }}
        >
          <img
            src={carouselImages[currentImageIndex]}
            alt={`Carousel ${currentImageIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
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
          justifyContent: "start",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* <div
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
        </div> */}
        {isLoggedIn ? (
          <h2
  style={{
    color: "#4a90e2",
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "40px",
    letterSpacing: "1px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  }}
>
  Welcome, {username}!
</h2>

        ) : (
          <form
            onSubmit={handleLogin}
            style={{
              background: "linear-gradient(4deg, black, #710707)",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              height:"90%",
              borderRadius:"0px"
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "50px",color:"whitesmoke" }}>Login</h2>
            <div style={{ marginBottom: "15px",display:"flex",flexDirection:"row",alignItems:"center",gap:48 }}>
              <label style={{ textAlign:"left", margin: "0px 0px 0px 10px" , fontSize: "1.4rem", color: "white", fontWeight: "300" }}>
                Email: 
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "70%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize:"1.2rem"
                }}
              />
            </div>
            <div style={{ marginBottom: "15px",display:"flex",flexDirection:"row",alignItems:"center",gap:12 }}>
              <label style={{ textAlign:"left", margin: "0px 0px 0px 10px" , fontSize: "1.4rem", color: "white", fontWeight: "300" }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "70%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize:"1.2rem"

                }}
              />
            </div>
            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>
            )}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <button
              type="submit"
              // onClick={() => navigate("/home")}
              style={{
                width: "50%",
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginTop:"60px",
                height:"40px",
                padding: "8px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              style={{
                width: "50%",
                padding: "8px 20px",
                borderRadius: "6px",
                backgroundColor: "#6c757d",
                fontSize: "1rem",
                color: "#fff",
                border: "none",
                marginTop: "30px",
                cursor: "pointer",
              }}
            >
              Sign up
            </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
