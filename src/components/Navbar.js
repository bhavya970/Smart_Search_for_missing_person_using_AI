import React from 'react';  
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar" style={{ marginBottom: "0" }}>
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/upload")}>Upload</li>
          <li onClick={() => navigate("/matches")}>Matches</li>
          <li>
            <Link className="nav-link" to="/faqs">
              FAQs
            </Link>
          </li>
          <li onClick={() => navigate("/logout")}>Logout</li>
        </ul>
        <div id="google_translate_element" style={{ marginRight: "20px" }}></div>
      </nav>
    );
}

export default Navbar;