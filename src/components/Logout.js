import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear session data (if you store login info in localStorage/sessionStorage)
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to login after logout
    navigate("/");
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "#4a90e2" }}>Logging you out...</h2>
      <p style={{ color: "#555" }}>Please wait while we redirect you.</p>
    </div>
  );
};

export default Logout;
