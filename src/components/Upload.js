import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Gallery from "./Gallery/Gallery";
import Navbar from "./Navbar";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image || !description || !reward) {
      setError("⚠ All fields are mandatory!");
      return;
    }
    if (isNaN(reward)) {
      setError("⚠ Reward must be a valid number (Rupees).");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("reward", reward);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("✅ Image uploaded successfully!");
        navigate("/home");
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Navbar */}
      <Navbar/>

<section
        className="carousel-section"
      >
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row",margin:"10px 0px" }}>
  <div style={{
    background: "linear-gradient(4deg, black, #710707)",
    borderRadius: "8px",
    height: "350px",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "36px 100px",
    marginBottom: "24px",
  }}>
  <h1 style={{ color: "white", fontSize: "2.6rem", fontWeight: "800", marginBottom: 24 }}>
    Upload Missing Person Information
  </h1>
  <h3 style={{ fontSize: "1.4rem", color: "white", fontWeight: "400", marginBottom: 16 }}>
    Help us reunite families by submitting details and a photo of a missing person.
  </h3>
  <p style={{ fontSize: "1.1rem", color: "white", fontWeight: "300" }}>
    Your submission will be securely stored and matched using AI-powered face recognition.
    Please provide clear images and accurate information to improve search results.
  </p>
  </div>
  </div>
</section>

      {/* Upload Section */}
      <section
        className="uploader glass"
        style={{
          background: "rgba(255,255,255,0.22)",
          borderRadius: "18px",
          margin: "30px auto",
          maxWidth: "500px",
          padding: "30px 25px",
          boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
          color: "#222",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", color: "white", fontWeight: "500", marginBottom: 16,color:"black" }}>Upload Missing Person Info</h2>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          Upload a photo and provide details. Add a reward (in Rupees) for
          finding this person.
        </p>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            margin: "15px 0",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            background: "#fff",
            fontSize: "1.2rem", color: "black", fontWeight: "300"
          }}
        />
        {previewUrl && (
          <div
            className="preview"
            style={{
              margin: "10px 0 18px 0",
              textAlign: "center",
            }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "2px solid #4a90e2",
              }}
            />
          </div>
        )}

        {/* Description Field */}
        <textarea
          placeholder="Enter description about the person..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            resize: "none",
            minHeight: "80px",
             fontSize: "1.2rem", color: "black", fontWeight: "300"
          }}
        />

        {/* Reward Field */}
        <input
          type="number"
          placeholder="Reward (in Rupees) *"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
             fontSize: "1.2rem", color: "black", fontWeight: "300"
          }}
          required
        />

        {/* Error Message */}
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        {/* Upload Button */}
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: loading
              ? "#aaa"
              : "linear-gradient(90deg, #4a90e2 0%, #9013fe 100%)",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Upload"}
        </button>
      </section>

    </div>
  );
};

export default Upload;