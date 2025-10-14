import React from "react";
import { BsChatFill } from "react-icons/bs";
import { FaInfoCircle, FaShareAlt } from "react-icons/fa";
import { FaGift, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { PiShareFatFill } from "react-icons/pi";
import ChatWindow from "../ChatWindow/Chat";

export default function GalleryCard({ item }) {
  const [likeCount, setLikeCount] = React.useState(item.likeCount || 0);
  const [liked, setLiked] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    try {
      const res = await fetch(
        `http://localhost:5000/api/case/${item._id}/like`,
        {
          method: "POST",
        }
      );
      if (res.ok) {
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      }
    } catch (err) {
      // handle error if needed
    }
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

  const handleChatClick = () => {
    setShowChat(true);
  };
  const styles = {
    containerStyle: {
      height: "500px",
      width: "320px",
      border: "2px solid black",
      borderRadius: "6px",
      // padding: "8px",
      // background: "linear-gradient(4deg, black, #710707)",
      // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    image: {
      height: "300px",
      width: "300px",
      objectFit: "cover",
    },
    uploaderSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 16px 8px 16px",
      borderBottom: "1px solid black",
    },
    profileInfo: {
      display: "flex",
      padding: "8px 16px 6px 16px",
      justifyContent: "space-between",
    },
    likesInfo: {
      borderTop: "1px solid black",
      display: "flex",
      padding: "8px 16px 6px 16px",
      justifyContent: "space-between",
    },
  };
  return (
    <>
      <div
        style={{
          display: showChat ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
        onClick={() => setShowChat(false)}
      >
        <div
          style={{
            background: "white",
            borderRadius: "8px",
            maxWidth: "70%",
            margin: "80px auto",
            // padding: "24px",
            position: "relative",
            boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setShowChat(false)}
            aria-label="Close"
          >
            ×
          </button>
          <ChatWindow
            currentUserId={sessionStorage.getItem("userId")}
            selectedUser={item}
          />
        </div>
      </div>
      <div key={item._id} style={styles.containerStyle}>
        <div className="uploader-section" style={styles.uploaderSection}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {item?.profilePhoto && item?.profilePhoto !== "undefined" ? (
              <img
                src={item.profilePhoto}
                alt="Uploader"
                className="uploader-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.png";
                }}
              />
            ) : (
              <div
                className="uploader-initials"
                style={{
                  borderRadius: "50%",
                  background: "black",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {(item.savedUserName || "U")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
            <span
              style={{
                fontSize: "16px",
                fontFamily: "cursive",
                fontStyle: "italic",
              }}
            >
              {item.savedUserName}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div>
              <BsChatFill
                style={{ height: "24px", width: "24px", cursor: "pointer" }}
                onClick={handleChatClick}
              />
            </div>
          </div>
        </div>
        <img src={item.imageUrl} alt="Missing Person" style={styles.image} />
        <div style={styles.likesInfo}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div>
              {liked ? (
                <FaHeart
                  style={{ height: "26px", width: "26px", cursor: "pointer" }}
                  onClick={handleLike}
                />
              ) : (
                <FaRegHeart
                  style={{ height: "26px", width: "26px", cursor: "pointer" }}
                  onClick={handleLike}
                />
              )}
            </div>
            <div>
              <PiShareFatFill
                style={{ height: "24px", width: "24px", cursor: "pointer" }}
                onClick={handleShare}
              />
            </div>
          </div>
          <div>
            <FiInfo
              title="More info"
              style={{ height: "24px", width: "24px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div style={styles.profileInfo}>
          <div>
            <label
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "cursive",
                fontStyle: "italic",
              }}
            >
              {item.name}
            </label>{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "cursive",
                fontStyle: "italic",
              }}
            >
              ({item.age})
            </span>
          </div>
          <div>
            <label
              style={{
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "cursive",
                fontStyle: "italic",
                color: "blue",
              }}
            >
              Reward:
            </label>{" "}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "cursive",
                fontStyle: "italic",
              }}
            >
              ₹{item.reward}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
