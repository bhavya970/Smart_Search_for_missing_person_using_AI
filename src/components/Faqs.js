import React from "react";
import { useNavigate } from "react-router-dom";
const Faqs = () => {
  const navigate = useNavigate();
  return (
    <>
     {/* <div style={{ fontFamily: "Arial, sans-serif" }}> */}
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
      {/* FAQ Section */}
      <section className="py-5 bg-light" id="faq">
        <div className="container">
          <h2 className="text-center mb-5 text-success">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="faqAccordion">
            {/* Q1 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button bg-success text-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What is AI Missing Person Finder?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  AI Missing Person Finder is a platform that helps reunite
                  missing persons with their families by using AI-powered image
                  matching and community collaboration.
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button bg-success text-white collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How does the system identify missing persons?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  The system uses AI face recognition models to extract facial
                  features from uploaded images and compares them with the
                  database to check for matches.
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button bg-success text-white collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Who can upload images?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Both families/police (for reference images of missing persons)
                  and the general public (for potential sightings) can upload
                  images to the platform.
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button bg-success text-white collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Is my data secure?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Yes, all uploaded images and personal data are stored securely
                  and only used for identification purposes.
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button bg-success text-white collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  How accurate is the AI matching?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  The AI system achieves high accuracy but still requires human
                  verification by families or law enforcement to confirm
                  matches.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>
            Subscribe to get updates, latest news, and important alerts about
            missing persons.
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
            &copy; {new Date().getFullYear()} AI Missing Person Finder. All
            rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Faqs;