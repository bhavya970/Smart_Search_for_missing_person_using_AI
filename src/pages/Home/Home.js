import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImageContext } from "../../context/ImageContext";
import "./Home.css";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Component1 from "../../components/ImageCarousel/Component1";
import Component2 from "../../components/ImageCarousel/Component2";
import Component3 from "../../components/ImageCarousel/Component3";
import Component4 from "../../components/ImageCarousel/Component4";
import Gallery from "../../components/Gallery/Gallery";
import Navbar from "../../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { uploadedImages } = useContext(ImageContext);

  // local state for likes & comments
  const [likes, setLikes] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  const handleLike = (index) => {
    setLikes((prev) => ({
      ...prev,
      [index]: prev[index] ? prev[index] - 1 : 1, // toggle
    }));
  };

  const handleCommentToggle = (index) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCommentChange = (index, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleAddComment = (index) => {
    if (!commentInput[index]) return;
    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), commentInput[index]],
    }));
    setCommentInput((prev) => ({ ...prev, [index]: "" }));
  };

  const handleShare = (item) => {
    const shareText = `Missing Person Alert 🚨\n\n${item.description}\nReward: ₹${item.reward}`;
    if (navigator.share) {
      navigator
        .share({
          title: "AI Missing Person Matcher",
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.log("Share failed:", err));
    } else {
      alert("Sharing not supported on this browser. Copy link: " + window.location.href);
    }
  };

  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      {/* <header className="app-header">
        <h1>AI Missing Person Matcher</h1>
        <p>
          A collaborative platform for families, law enforcement, and the public
          to help identify and reunite missing persons.
        </p>
      </header> */}

      {/* Uploaded Posts */}
      <section className="carousel-section">
        
          <ImageCarousel images={[<Component1/>,<Component2/>,<Component3/>,<Component4/>]} />
        
      </section>
      <section>{<Gallery/>}</section>
      
      
    </div>
    
  );
};

export default Home;
