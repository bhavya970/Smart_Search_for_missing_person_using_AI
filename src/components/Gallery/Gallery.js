import React, { useEffect, useState } from "react";
import "./Gallery.css";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/cases")
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched cases", data);
        setCases(data);
        // setLikes(data.likeCount || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/case/${id}/like`, {
        method: "POST",
      });
      if (res.success) {
        setCases((prevCases) =>
          prevCases.map((c) =>
            c._id === id ? { ...c, likeCount: c.likeCount + 1 } : c
          )
        );
      }
    } catch (err) {
      // handle error if needed
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddComment = (id) => {
    if (!commentInput[id]) return;
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), commentInput[id]],
    }));
    setCommentInput((prev) => ({ ...prev, [id]: "" }));
  };

  const handleShare = (item) => {
    const shareText = `Missing Person Alert 🚨\n\n${item.description}\nReward: ₹${item.reward}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Missing Person Alert",
          text: shareText,
          url: item.imageUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText + "\n" + item.imageUrl);
      alert("Share text copied to clipboard!");
    }
  };

  return (
    <div className="gallery-section">
      <h2>Missing Persons Gallery</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <div className="gallery-grid">
          {cases.map((item) => (
            <GalleryCard key={item._id} item={item} />
            // <div className="gallery-card" key={item._id}>
            //   <img
            //     src={item.imageUrl}
            //     alt="Missing Person"
            //     className="gallery-img"
            //   />
            //   <div className="gallery-info">
            //     <div
            //       style={{
            //         display: "flex",
            //         flexDirection: "column",
            //         gap: "2px",
            //       }}
            //     >
            //       <div>
            //         <label>{item.name}</label> <span>({item.age})</span>
            //       </div>
            //     </div>
            //     <span className="gallery-reward">Reward: ₹{item.reward}</span>
            //     <div className="gallery-actions">
            //       <button
            //         className="like-btn"
            //         onClick={() => handleLike(item._id)}
            //       >
            //         👍 {item.likeCount}
            //       </button>
            //       <button
            //         className="share-btn"
            //         onClick={() => handleShare(item)}
            //       >
            //         🔗 Share
            //       </button>
            //     </div>
            //     <hr />
            //     <div className="uploaded-by">
            //       {item?.profilePhoto && item?.profilePhoto !== "undefined" ? (
            //         <img
            //           src={item.profilePhoto}
            //           alt="Uploader"
            //           className="uploader-avatar"
            //           onError={(e) => {
            //             e.target.onerror = null;
            //             e.target.src = "/default-avatar.png";
            //           }}
            //         />
            //       ) : (
            //         <div className="uploader-initials">
            //           {(item.savedUserName || "U")
            //             .split(" ")
            //             .map((n) => n[0])
            //             .join("")
            //             .toUpperCase()}
            //         </div>
            //       )}
            //       <span>Uploaded by: {item.savedUserName || "Unknown"}</span>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
