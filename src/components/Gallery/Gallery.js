import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/cases")
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
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
            <div className="gallery-card" key={item._id}>
              <img src={item.imageUrl} alt="Missing Person" className="gallery-img" />
              <div className="gallery-info">
                <p className="gallery-desc">{item.description}</p>
                <span className="gallery-reward">Reward: ₹{item.reward}</span>
                <div className="gallery-actions">
                  <button className="like-btn" onClick={() => handleLike(item._id)}>
                    👍 {likes[item._id] || 0}
                  </button>
                  <button className="share-btn" onClick={() => handleShare(item)}>
                    🔗 Share
                  </button>
                </div>
                <div className="comment-section">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput[item._id] || ""}
                    onChange={(e) => handleCommentChange(item._id, e.target.value)}
                    className="comment-input"
                  />
                  <button className="comment-btn" onClick={() => handleAddComment(item._id)}>
                    💬
                  </button>
                  <div className="comments-list">
                    {(comments[item._id] || []).map((cmt, idx) => (
                      <div key={idx} className="comment-item">
                        {cmt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;