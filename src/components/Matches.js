import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";

const Matches = () => {
  const [mode, setMode] = useState("upload"); // "camera" or "upload"
  const [scanImage, setScanImage] = useState(null);
  const [scanPreview, setScanPreview] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [allMatches, setAllMatches] = useState([]);
  const [bestMatch, setBestMatch] = useState(null);

  // Camera states
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  // Handle mode change
  const handleModeChange = (e) => {
    setMode(e.target.value);
    if (e.target.value === "camera") {
      startCamera();
    } else {
      // Reset camera if switching to upload
      setCameraActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    setScanImage(null);
    setScanPreview(null);
    setAllMatches([]);
    setBestMatch(null);
    if (videoRef.current && videoRef.current.srcObject) {
      // Stop camera if switching away
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Upload mode handlers
  const handleScanImageChange = (e) => {
    const file = e.target.files[0];
    setScanImage(file);
    setScanPreview(file ? URL.createObjectURL(file) : null);
    setAllMatches([]);
    setBestMatch(null);
  };

  // Camera mode handlers
  const startCamera = async () => {
    setAllMatches([]);
    setBestMatch(null);
    setScanImage(null);
    setScanPreview(null);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please allow camera permissions.");
      setCameraActive(false);
    }
  };

  const captureFromCamera = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        setScanImage(blob);
        setScanPreview(URL.createObjectURL(blob));
      }, "image/jpeg");

      setCameraActive(false);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  // Common match handler
  const handleScanMatch = async () => {
    if (!scanImage) {
      alert("⚠️ Please upload or capture an image first!");
      return;
    }
    setScanLoading(true);
    setAllMatches([]);
    setBestMatch(null);

    const formData = new FormData();
    formData.append("image", scanImage);

    try {
      const response = await fetch("http://localhost:5000/api/match", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.matches && data.matches.length > 0) {
        setAllMatches(data.matches);
        console.log("best match", data.bestMatch);
        setBestMatch(data.bestMatch || data.matches[0]);
      } else if (data.match) {
        setBestMatch(data.match);
        setAllMatches(data.match ? [data.match] : []);
      } else {
        setAllMatches([]);
        setBestMatch(null);
      }
    } catch {
      setAllMatches([]);
      setBestMatch(null);
    } finally {
      setScanLoading(false);
    }
  };

  // Stop camera when leaving page
  React.useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  React.useEffect(() => {
    // Only run if bestMatch is set and similarity > 50
    console.log("Best match updated:", bestMatch?._doc?.uploadedUserId);
    if (bestMatch && bestMatch.similarity > 50 && bestMatch?._doc?.uploadedUserId) {
      fetch(`http://localhost:5000/api/user/${bestMatch?._doc?.uploadedUserId}`)
        .then((res) => res.json())
        .then((user) => {
          if (user && user.email) {
            // Call backend to send email
            console.log("Sending email to:", user.email);
            fetch("http://localhost:5000/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: user.email,
                subject: "Face Match Alert",
                text: `A new face match with ${bestMatch.similarity}% similarity was found for your uploaded image (${bestMatch.description}). Please check the platform for details.`,
              }),
            });
          }
        });
    }
  }, [bestMatch]);

  return (
    <div>
      <section className="carousel-section">
        <div
          style={{
            background: "linear-gradient(4deg, black, #710707)",
            borderRadius: "8px",
            height: "400px",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "36px 100px",
            margin: "10px 0px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "2.6rem",
              fontWeight: "800",
              marginBottom: 24,
            }}
          >
            Face Match Results
          </h1>
          <h3
            style={{
              fontSize: "1.4rem",
              color: "white",
              fontWeight: "400",
              marginBottom: 16,
            }}
          >
            Upload a photo or use your camera to scan and find possible matches
            from our database.
          </h3>
          <p style={{ fontSize: "1.1rem", color: "white", fontWeight: "300" }}>
            Our AI-powered system compares your image with all stored cases and
            shows the best and similar matches. Please use clear, front-facing
            photos for accurate results.
          </p>
        </div>
      </section>

      {/* Radio buttons for mode selection */}

      {/* Upload Mode */}

      <section
        className="uploader glass"
        style={{
          background: "rgba(255,255,255,0.97)",
          borderRadius: "18px",
          margin: "30px auto",
          maxWidth: "500px",
          padding: "25px",
          textAlign: "center",
          boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "black",
            fontWeight: "500",
            marginBottom: 16,
          }}
        >
          Face Scanning
        </h2>
        <section style={{ textAlign: "center", margin: "24px 0" }}>
          <label
            style={{ marginRight: "24px", fontSize: "1.1rem", color: "black" }}
          >
            <input
              type="radio"
              value="upload"
              checked={mode === "upload"}
              onChange={handleModeChange}
              style={{ marginRight: "8px" }}
            />
            Upload
          </label>
          <label style={{ fontSize: "1.1rem", color: "black" }}>
            <input
              type="radio"
              value="camera"
              checked={mode === "camera"}
              onChange={handleModeChange}
              style={{ marginRight: "8px" }}
            />
            Camera
          </label>
        </section>
        {mode === "upload" ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleScanImageChange}
              style={{ width: 360, height: 45, fontSize: 16, color: "black" }}
            />
            {scanPreview && (
              <div className="preview" style={{ marginTop: "15px" }}>
                <img
                  src={scanPreview}
                  alt="Scan"
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
              onClick={handleScanMatch}
              disabled={scanLoading}
              className="upload-btn"
              style={{
                marginTop: "15px",
                width: "80%",
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginTop: "6px",
                height: "40px",
                padding: "8px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {scanLoading ? "Scanning..." : "Scan & Find Match"}
            </button>
          </>
        ) : (
          <>
            {cameraActive && (
              <>
                <div style={{ margin: "20px 0", position: "relative" }}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    width={220}
                    height={180}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #4a90e2",
                      boxShadow: "0 0 16px #4a90e2",
                      background: "#e3eafc",
                    }}
                  />
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                </div>
                <button
                  onClick={captureFromCamera}
                  className="upload-btn"
                  style={{ marginBottom: "15px", width: "80%" }}
                >
                  Capture Photo
                </button>
              </>
            )}
            {scanPreview && (
              <div className="preview" style={{ marginTop: "15px" }}>
                <img
                  src={scanPreview}
                  alt="Camera Capture"
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
              onClick={handleScanMatch}
              disabled={scanLoading}
              className="upload-btn"
              style={{
                marginTop: "15px",
                width: "80%",
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginTop: "6px",
                height: "40px",
                padding: "8px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {scanLoading ? "Scanning..." : "Scan & Find Match"}
            </button>
          </>
        )}
      </section>

      {/* Display Best Match */}
      {bestMatch && (
        <section style={{ maxWidth: "600px", margin: "30px auto" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "500",
              marginTop: 48,
              color: "black",
            }}
          >
            Best Match
          </h2>
          <div
            style={{
              marginTop: "10px",
              background: "#f8fafc",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              padding: "18px",
              textAlign: "center",
              border: "2px solid #710707",
            }}
          >
            <img
              src={bestMatch.imageUrl}
              alt="Best Match"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "8px",
                border: "2px solid #4a90e2",
                marginBottom: "10px",
                objectFit: "cover",
              }}
            />
            <div style={{ color: "black" }}>
              <p
                style={{ fontSize: "1.2rem", fontWeight: "300", marginTop: 12 }}
              >
                <strong>Description:</strong> {bestMatch.description}
              </p>
              <p
                style={{ fontSize: "1.2rem", fontWeight: "300", marginTop: 12 }}
              >
                <strong>Reward:</strong> ₹{bestMatch.reward}
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "300",
                  marginTop: 12,
                  color: "#4a90e2",
                }}
              >
                <strong>Similarity:</strong> {bestMatch.similarity}%
              </p>
            </div>
          </div>
        </section>
      )}

      <hr
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          border: "1px solid black",
        }}
      />
      {/* Display All Matches */}
      {allMatches.length > 0 && (
        <section style={{ maxWidth: "900px", margin: "30px auto" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "500",
              marginTop: 48,
              color: "black",
            }}
          >
            All Matches
          </h2>
          <div className="gallery-grid">
            {allMatches.map((match, idx) => (
              <div
                key={idx}
                className="gallery-card"
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "18px",
                  border: "2px solid #e3eafc",
                }}
              >
                <img
                  src={match.imageUrl}
                  alt="Match"
                  className="gallery-img"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "cover",
                    borderBottom: "1px solid #eee",
                  }}
                />
                <div
                  className="gallery-info"
                  style={{ padding: "12px", width: "100%" }}
                >
                  <p
                    className="gallery-desc"
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "1.2rem",
                      color: "black",
                      fontWeight: "300",
                    }}
                  >
                    {match.description}
                  </p>
                  <span
                    className="gallery-reward"
                    style={{
                      fontSize: "1.2rem",
                      color: "black",
                      fontWeight: "300",
                    }}
                  >
                    Reward: ₹{match.reward}
                  </span>
                  <div
                    style={{
                      marginTop: "6px",
                      color: "#4a90e2",
                      fontSize: "1.2rem",
                      fontWeight: "300",
                    }}
                  >
                    Similarity: {match.similarity}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No matches found */}
      {!scanLoading && !bestMatch && scanPreview && (
        <p style={{ marginTop: "20px", color: "#888", textAlign: "center" }}>
          No match found in database.
        </p>
      )}
    </div>
  );
};

export default Matches;
