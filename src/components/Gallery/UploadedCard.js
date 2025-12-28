import React from "react";
import { BsChatFill } from "react-icons/bs";
import { FaInfoCircle, FaShareAlt } from "react-icons/fa";
import { FaGift, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { PiShareFatFill } from "react-icons/pi";
import ChatWindow from "../ChatWindow/Chat";

export default function UploadedCard({ item }) {
  const [likeCount, setLikeCount] = React.useState(item.likeCount || 0);
  const [liked, setLiked] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  const [otherUserData, setOtherUserData] = React.useState({});
  const [selectedUserId, setSelectedUserId] = React.useState(
    item.uploadedUserId
  );
  const [showInfoModal, setShowInfoModal] = React.useState(false);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${item.uploadedUserId}`
        );
        if (response.ok) {
          const userData = await response.json();
          setOtherUserData(userData);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (item.uploadedUserId) {
      fetchUserDetails();
    }
  }, [item.uploadedUserId]);

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

      {showInfoModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowInfoModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              padding: "24px",
              position: "relative",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "8px",
                right: "12px",
                background: "none",
                border: "none",
                fontSize: "32px",
                cursor: "pointer",
              }}
              onClick={() => setShowInfoModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
              Missing Person Details
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "12px",
                }}
              />
              <div>
                <strong>Name:</strong> {item.name}
              </div>
              <div>
                <strong>Age:</strong> {item.age}
              </div>
              <div>
                <strong>Gender:</strong> {item.gender}
              </div>
              <div>
                <strong>Contact Email:</strong> {otherUserData.email || "N/A"}
              </div>
              <div>
                <strong>Address:</strong> {item.address || "N/A"}
              </div>
              <div>
                <strong>Description:</strong> {item.description || "N/A"}
              </div>
              <div>
                <strong>Reward:</strong> ₹{item.reward}
              </div>
            </div>
          </div>
        </div>
      )}
      <div key={item._id} style={styles.containerStyle}>
        
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
                      onClick={() => setShowInfoModal(true)}
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