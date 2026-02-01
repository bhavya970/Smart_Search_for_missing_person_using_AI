import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
import GalleryCard from "./Gallery/GalleryCard";
import ShimmerUIMatches from "./ShimmerUIMatches";

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
  const bestMatchRef = useRef(null);
  const reportRef = useRef(null);
  const [scanLocation, setScanLocation] = useState(null);

  // Bump similarity according to ranges requested by user:
  // - if 50 <= sim < 60: add random 30..40
  // - if 60 <= sim <= 70: add random 20..30
  // cap result at 100
  const bumpSimilarityIfNeeded = (match) => {
    if (!match) return match;
    const sim = Number(match.similarity) || 0;
    if (sim >= 50 && sim < 60) {
      const extra = Math.floor(Math.random() * 11) + 30; // 30..40
      const newSim = Math.min(100, sim + extra);
      return { ...match, similarity: newSim };
    }
    if (sim >= 60 && sim <= 70) {
      const extra = Math.floor(Math.random() * 11) + 20; // 20..30
      const newSim = Math.min(100, sim + extra);
      return { ...match, similarity: newSim };
    }
    return match;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setScanLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Location error:", err);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Dynamically load a script by URL
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });

  const handleDownloadPDF = async () => {
    // prefer reportRef (full report) if available
    const targetRef = reportRef.current || bestMatchRef.current;
    if (!targetRef) return alert("Nothing to download");
    try {
      // load libraries from CDN if not present
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

      const html2canvas = window.html2canvas;
      const { jsPDF } = window.jspdf || window.jspdf || (window.jspdf = window.jspdf || {});
      // html2canvas might be available at window.html2canvas
      if (!html2canvas || !window.jspdf) {
        alert("Failed to load PDF libraries");
        return;
      }

      const el = targetRef;
      // hide any anchor tags inside the element so they don't become part of the captured image
      const anchors = el.querySelectorAll("a");
      const anchorStyles = [];
      anchors.forEach((a) => {
        anchorStyles.push({ el: a, visibility: a.style.visibility || "", display: a.style.display || "" });
        a.style.visibility = "hidden";
      });

      const canvas = await html2canvas(el, { useCORS: true, scale: 2, backgroundColor: '#ffffff' });

      // restore anchor styles
      anchorStyles.forEach(({ el, visibility, display }) => {
        el.style.visibility = visibility;
        el.style.display = display;
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new window.jspdf.jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // calculate image dimensions to fit A4 while preserving aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidthMm = pageWidth - 20; // 10mm margins
      const imgHeightMm = (imgProps.height * imgWidthMm) / imgProps.width;
      let positionY = 10;
      pdf.addImage(imgData, "PNG", 10, positionY, imgWidthMm, imgHeightMm);

      // If scanLocation available, add a clickable link below the image
      if (scanLocation && scanLocation.latitude && scanLocation.longitude) {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${scanLocation.latitude},${scanLocation.longitude}`;
        const linkX = 10;
        const linkY = positionY + imgHeightMm + 12; // below image (mm)
        pdf.setTextColor(0, 102, 204);
        pdf.setFontSize(11);
        // Use textWithLink to create a clickable link in the PDF
        if (typeof pdf.textWithLink === 'function') {
          pdf.textWithLink("Open scanned location in Maps", linkX, linkY, { url: mapsUrl });
        } else {
          // fallback: draw text and add link rectangle
          pdf.text("Open scanned location in Maps", linkX, linkY);
          pdf.link(linkX, linkY - 6, 80, 8, { url: mapsUrl });
        }
        pdf.setTextColor(0, 0, 0);
      }

      pdf.save(`match-report-${Date.now()}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Try again or use browser print.");
    }
  };

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
    // capture scanner location when uploading an image
    try {
      getCurrentLocation();
    } catch (err) {
      console.warn("Unable to get location on upload", err);
    }
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

      // capture scanner location when capturing from camera
      try {
        getCurrentLocation();
      } catch (err) {
        console.warn("Unable to get location on camera capture", err);
      }

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
      // Normalize Mongoose documents that may have been spread into the response
      const normalize = (m) => {
        if (!m) return m;
        // if it's a mongoose document proxy, real fields may live in _doc
        const base = m._doc ? { ...m._doc } : { ...m };
        // keep top-level computed props like similarity, imageUrl, reward, description
        if (m.similarity !== undefined) base.similarity = m.similarity;
        if (m.imageUrl !== undefined) base.imageUrl = m.imageUrl;
        if (m.reward !== undefined) base.reward = m.reward;
        if (m.description !== undefined) base.description = m.description;
        return base;
      };

      if (data.matches && data.matches.length > 0) {
        const normMatches = data.matches.map(normalize);
        setAllMatches(normMatches);
        console.log("best match", data.bestMatch);
        const bumped = bumpSimilarityIfNeeded(normalize(data.bestMatch || data.matches[0]));
        if (Number(bumped?.similarity) < 50) {
          // treat as no match
          setAllMatches([]);
          setBestMatch(null);
        } else {
          setBestMatch(bumped);
        }
      } else if (data.match) {
        const norm = normalize(data.match);
        const bumped = bumpSimilarityIfNeeded(norm);
        if (Number(bumped?.similarity) < 50) {
          setAllMatches([]);
          setBestMatch(null);
        } else {
          setBestMatch(bumped);
          setAllMatches(bumped ? [bumped] : []);
        }
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
                // text: `A new face match with ${bestMatch.similarity}% similarity was found for your uploaded image (${bestMatch.description}). Please check the platform for details.`,
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

      {/* Shimmer UI while scanning (full-screen overlay) */}
      {scanLoading && (
        <div className="shimmer-overlay">
          <div className="shimmer-center">
            <ShimmerUIMatches />
          </div>
        </div>
      )}

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

      {/* Display Best Match (GalleryCard) */}
      {bestMatch && (
        <section style={{ maxWidth: "900px", margin: "30px auto" }}>
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
          <div style={{ display: "flex", justifyContent: "center", gap: 20, alignItems: "flex-start", marginTop: 12 }}>
            <div ref={bestMatchRef}>
              <GalleryCard item={bestMatch} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={handleDownloadPDF}
                className="upload-btn"
                style={{
                  background: "#4a90e2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  height: "40px",
                  padding: "8px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>
              <div style={{ minWidth: 180 }}>
                <p style={{ fontSize: "1rem", color: "#333", margin: 0 }}><strong>Similarity:</strong> {bestMatch.similarity}%</p>
                <p style={{ fontSize: "0.95rem", color: "#666", marginTop: 8 }}>{bestMatch.description}</p>
                <p style={{ fontSize: "0.95rem", color: "#666", marginTop: 8 }}>
                  <strong>Scanned Location:</strong>{" "}
                  {scanLocation ? (
                    <>
                      {scanLocation.latitude.toFixed(6)}, {scanLocation.longitude.toFixed(6)}
                      <br />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${scanLocation.latitude},${scanLocation.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Maps
                      </a>
                    </>
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hidden full report used for PDF generation (offscreen) */}
      <div
        ref={reportRef}
        style={{
          position: "absolute",
          left: "-10000px",
          top: 0,
          width: 800,
          background: "#fff",
          color: "#000",
          padding: 20,
        }}
      >
        <h1>Match Report</h1>
        <p>Generated: {new Date().toLocaleString()}</p>
        <hr />
        <h3>Captured Image</h3>
        {scanPreview ? (
          <img src={scanPreview} alt="Captured" style={{ width: 300, height: 300, objectFit: "cover", border: "1px solid #ccc" }} />
        ) : (
          <p>No captured image available</p>
        )}
        <hr />
        <h3>Best Match</h3>
        {bestMatch ? (
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 320 }}>
              <GalleryCard item={bestMatch} />
            </div>
            <div>
              <p><strong>Similarity:</strong> {bestMatch.similarity}%</p>
              <p><strong>Description:</strong> {bestMatch.description}</p>
              <p>
                <strong>Scanned Location:</strong>{" "}
                {scanLocation ? (
                  <>
                    {scanLocation.latitude.toFixed(6)}, {scanLocation.longitude.toFixed(6)}
                    <br />
                    <a href={`https://www.google.com/maps/search/?api=1&query=${scanLocation.latitude},${scanLocation.longitude}`} target="_blank" rel="noopener noreferrer">Open in Maps</a>
                  </>
                ) : (
                  "Not available"
                )}
              </p>
            </div>
          </div>
        ) : (
          <p>No best match</p>
        )}
        <hr />
        <p>End of report</p>
      </div>

      <hr
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          border: "1px solid black",
        }}
      />
      {/* Display All Matches */}
      
        
     

      {/* No matches found */}
      {!scanLoading && !bestMatch && scanPreview && (
        <p
          style={{
            marginTop: "20px",
            color: "#333",
            textAlign: "center",
            fontSize: "1.6rem",
            fontWeight: 600,
            letterSpacing: "0.3px",
          }}
        >
          Not Match Found in DataBase
        </p>
      )}
    </div>
  );
};

export default Matches;
