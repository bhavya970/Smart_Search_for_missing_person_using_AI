import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Faqs = () => {
  const navigate = useNavigate();
  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
    
    
      <Navbar/>

     
      {/* FAQ Section */}
      <section id="faq" style={{marginTop: "48px", marginBottom: "48px"}}>
        <div className="container">
          <div className="accordion" id="faqAccordion">
            {/* Q1 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button text-white" style={{  background: "linear-gradient(4deg, black, #710707)",}}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h3 style={{ fontSize: "1.2rem", color: "white", fontWeight: "400", }}>What is AI Missing Person Finder?</h3>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ fontSize: "1.1rem", color: "white", fontWeight: "300",color:"black" }}>
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
                  className="accordion-button text-white collapsed" style={{  background: "linear-gradient(4deg, black, #710707)",}}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h3 style={{ fontSize: "1.2rem", color: "white", fontWeight: "400", }}>How does the system identify missing persons?</h3>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ fontSize: "1.1rem", color: "white", fontWeight: "300",color:"black" }}>
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
                  className="accordion-button text-white collapsed" style={{  background: "linear-gradient(4deg, black, #710707)",}}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <h3 style={{ fontSize: "1.2rem", color: "white", fontWeight: "400", }}>Who can upload images?</h3>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ fontSize: "1.1rem", color: "white", fontWeight: "300",color:"black" }}>
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
                  className="accordion-button text-white collapsed" style={{  background: "linear-gradient(4deg, black, #710707)",}}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                 <h3 style={{ fontSize: "1.2rem", color: "white", fontWeight: "400", }}> Is my data secure?</h3>
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ fontSize: "1.1rem", color: "white", fontWeight: "300",color:"black" }}>
                  Yes, all uploaded images and personal data are stored securely
                  and only used for identification purposes.
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="accordion-item border-0 shadow-sm mb-3">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button text-white collapsed" style={{  background: "linear-gradient(4deg, black, #710707)",}}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                 <h3 style={{ fontSize: "1.2rem", color: "white", fontWeight: "400", }}> How accurate is the AI matching?</h3>
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body" style={{ fontSize: "1.1rem", color: "white", fontWeight: "300",color:"black" }}>
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

export default Faqs;