import React, { useState } from "react";
import "./ImageCarousel.css";
import Component1 from "./Component1";
import Component2 from "./Component2";

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prevImage = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const nextImage = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

React.useEffect(() => {
    const timer = setTimeout(() => {
        nextImage();
    }, 8000);
    return () => clearTimeout(timer);
}, [current, images.length]);

  return (
    <div className="carousel-container">
      <button onClick={prevImage} className="carousel-btn" style={{position:"absolute",left:"10px"}}><span style={{fontSize:"22px"}}>⟨</span></button>
      <div className="carousel-image-card">
        {images[current] }
      </div>
      <button onClick={nextImage} className="carousel-btn" style={{position:"absolute",right:"10px"}}>⟩</button>
<div
  className="carousel-indicators"
  style={{
    position: "absolute",
    right: 0,
    bottom:"unset",
    top:"500px",
    left: 0,
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    padding: 0,
    marginRight: "15%",
    marginBottom: "1rem",
    marginLeft: "15%",
  }}
>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`indicator-dot${idx === current ? " active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}
