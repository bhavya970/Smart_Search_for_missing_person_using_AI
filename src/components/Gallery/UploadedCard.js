import React from "react";
import { BsChatFill } from "react-icons/bs";
import { FaInfoCircle, FaShareAlt } from "react-icons/fa";
import { FaGift, FaHeart, FaRegHeart, FaShare } from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import ChatWindow from "../ChatWindow/Chat";

export default function UploadedCard({ item, onDelete, showDelete }) {
  const [likeCount, setLikeCount] = React.useState(item.likeCount || 0);
  const [liked, setLiked] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  const [otherUserData, setOtherUserData] = React.useState({});
  const [selectedUserId, setSelectedUserId] = React.useState(
    item.uploadedUserId
  );
  const [showInfoModal, setShowInfoModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

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

  // fetch unread count for chat with uploader
  React.useEffect(() => {
    const currentUserId = sessionStorage.getItem('userId');
    if (!currentUserId || !item.uploadedUserId) return;
    // fetch chat contacts and find unread count for this uploader
    fetch(`http://localhost:5000/api/chat-contacts/${currentUserId}`)
      .then((res) => res.json())
      .then((contacts) => {
        if (!Array.isArray(contacts)) return;
        const contact = contacts.find((c) => String(c.userId) === String(item.uploadedUserId));
        if (contact) {
          // backend may provide different field names for unread count
          const count = contact.unreadCount ?? contact.unread ?? contact.unreadMessages ?? 0;
          setUnreadCount(Number(count) || 0);
        }
      })
      .catch(() => {});
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
      {showDeleteModal && (
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
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              maxWidth: "520px",
              width: "92%",
              padding: "18px",
              position: "relative",
              boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: 0 }}>Are you sure you want to delete this item?</h3>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "320px", height: "240px", objectFit: "cover", borderRadius: 8 }}
            />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{ padding: "10px 20px", background: "#9aa0b4", color: "white", border: "none", borderRadius: 6 }}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (deleting) return;
                  setDeleting(true);
                  try {
                    const res = await fetch(`http://localhost:5000/api/case/${item._id}`, { method: 'DELETE' });
                    if (res.ok) {
                      if (typeof onDelete === 'function') onDelete(item._id);
                      setShowDeleteModal(false);
                    } else {
                      alert('Delete failed');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Server error');
                  } finally {
                    setDeleting(false);
                  }
                }}
                style={{ padding: "10px 20px", background: "#e15b5b", color: "white", border: "none", borderRadius: 6 }}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
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
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <BsChatFill
                        title="Chat"
                        style={{ height: 22, width: 22, cursor: 'pointer' }}
                        onClick={handleChatClick}
                      />
                      {unreadCount > 0 && (
                        <span style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          background: '#e53935',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px 6px',
                          fontSize: 11,
                          fontWeight: 700,
                          lineHeight: 1,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}>{unreadCount > 99 ? '99+' : unreadCount}</span>
                      )}
                    </div>
                    <FiInfo
                      title="More info"
                      style={{ height: "24px", width: "24px", cursor: "pointer" }}
                      onClick={() => setShowInfoModal(true)}
                    />
                    {showDelete && (
                      <FaTrashAlt
                        title="Delete"
                        style={{ height: 22, width: 22, cursor: 'pointer', color: '#d33' }}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    )}
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