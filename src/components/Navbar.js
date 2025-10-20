import { useState, useEffect } from "react";
import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
      if (userId) {
        fetch(`http://localhost:5000/api/user/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Fetched user details:", data);
            setUser(data);
          })
          .catch((err) => {
            console.error("Failed to fetch user details:", err);
          });
      }

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
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,ta,te,kn,ml,bn,gu,mr,pa,ur",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
        // Hide "Powered by Google Translate" text
        const hideGoogleBranding = () => {
          const branding = document.querySelector(".goog-logo-link");
          if (branding) branding.style.display = "none";
          const poweredBy = document.querySelector(".goog-te-gadget");
          if (poweredBy)
            poweredBy.childNodes.forEach((node) => {
              if (
                node.nodeType === 3 &&
                node.textContent.includes("Powered by")
              ) {
                node.textContent = "";
              }
            });
        };
        setTimeout(hideGoogleBranding, 1000);
      };
    };

    if (!window.googleTranslateElementInit) addGoogleTranslateScript();
  }, [userId]);

  const getInitial = (name) =>
    name ? user?.username.charAt(0).toUpperCase() : "U";
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 47, 47, 0.7)",
        padding: "10px 20px",
        height: "100px",
      }}
    >
      <ul>
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/upload")}>Upload</li>
        <li onClick={() => navigate("/matches")}>Matches</li>
        <li onClick={() => navigate("/faqs")}>Faqs</li>
        <li style={{ textAlign: "center", alignSelf: "center" }}>
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
        {user?.profilePhoto && user?.profilePhoto !== "undefined" ? (
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
