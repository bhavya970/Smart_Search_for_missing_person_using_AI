import { useState, useEffect } from "react";
import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    if (savedUser) setUser(savedUser);

    // Dynamically load Google Translate script
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };
    };

    if (!window.googleTranslateElementInit) addGoogleTranslateScript();
  }, []);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  return (
    <nav className="navbar" style={{ marginBottom: "0" }}>
      <ul>
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/upload")}>Upload</li>
        <li onClick={() => navigate("/matches")}>Matches</li>
        <li onClick={() => navigate("/faqs")}>Faqs</li>
        <li>
          <div id="google_translate_element" className="custom-translate"></div>
        </li>
      </ul>
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "calc (50% - 40px)",
          cursor: "pointer",
        }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {user?.profilePhoto ? (
          <img
            src={user?.profilePhoto}
            alt="User"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        ) : (
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#007bff",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            {getInitial(user?.username)}
          </div>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            style={{
              color: "black",
              position: "absolute",
              right: "0",
              top: "50px",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            <div
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onClick={() => navigate("/profile")}
            >
              Profile
            </div>

            <div
              style={{ padding: "10px 20px", cursor: "pointer" }}
              onClick={() => navigate("/logout")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
