import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const mockDatabase = [
  {
    id: 1,
    name: "John Doe",
    age: 34,
    lastSeen: "Hyderabad",
    confidence: 0.92,
    imageUrl: "https://www.financialexpress.com/wp-content/uploads/2025/05/Colonel-Sophia-Qureshi-X.jpg?w=440&&text=john",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    lastSeen: "Delhi",
    confidence: 0.85,
    imageUrl: "https://images.news18.com/ibnkhabar/uploads/2025/05/Wing-Commander-Vyomika-Singh-2025-05-502ef7d70b173d9ffebd7a339e9727c5.jpg?impolicy=website&width=640&height=480&&text=jane",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    age: 40,
    lastSeen: "Mumbai",
    confidence: 0.75,
    imageUrl: "https://via.placeholder.com/120x120.png?text=Rahul",
  },
];

const Matches = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMatch = () => {
    if (!uploadedImage) {
      alert("⚠️ Please upload an image first!");
      return;
    }

    setLoading(true);

    // Simulating AI match logic with mock DB
    setTimeout(() => {
      setLoading(false);

      // Randomly pick "matches" for now
      const matchedData = mockDatabase.filter(
        (person) => person.confidence >= 0.8 // keep only good matches
      );

      setResults(matchedData);
    }, 2000);
  };

  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/upload")}>Upload</li>
          <li style={{ fontWeight: "bold", color: "#4a90e2" }}>Matches</li>
          <li onClick={() => navigate("/faqs")}>FAQs</li>
          <li onClick={() => navigate("/logout")}>Logout</li>
        </ul>
      </nav>

      {/* Upload Section */}
      <section
        className="uploader glass"
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: "18px",
          margin: "30px auto",
          maxWidth: "500px",
          padding: "25px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4a90e2" }}>Check for Matches</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {previewUrl && (
          <div className="preview" style={{ marginTop: "15px" }}>
            <img
              src={previewUrl}
              alt="Uploaded"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "12px",
                border: "2px solid #4a90e2",
              }}
            />
          </div>
        )}

        <button
          onClick={handleMatch}
          disabled={loading}
          className="upload-btn"
          style={{ marginTop: "15px" }}
        >
          {loading ? "Searching..." : "Find Matches"}
        </button>
      </section>

      {/* Results */}
      <section style={{ maxWidth: "800px", margin: "20px auto" }}>
        <h2>Match Results</h2>
        {results.length === 0 && !loading && (
          <p>No matches yet. Upload an image to check.</p>
        )}
        {results.map((person) => (
          <div
            key={person.id}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={person.imageUrl}
              alt={person.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "8px",
                border: "2px solid #4a90e2",
              }}
            />
            <div>
              <p>
                <strong>Name:</strong> {person.name}
              </p>
              <p>
                <strong>Age:</strong> {person.age}
              </p>
              <p>
                <strong>Last Seen:</strong> {person.lastSeen}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {(person.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Matches;
