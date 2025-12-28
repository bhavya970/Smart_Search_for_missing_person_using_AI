import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { MdAttachFile } from "react-icons/md";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const styles = {
  senderStyle: {
    backgroundColor: "#e4e6eb",
    color: "black",
    padding: "8px 16px",
    borderRadius: "20px",
    fontStyle: "italic",
    fontFamily: "cursive",
    fontSize: "16px",
    alignSelf: "flex-start",
  },
  currUserStyle: {
    backgroundColor: "#e4e6eb",
    color: "black",
    padding: "8px 16px",
    borderRadius: "20px",
    alignSelf: "flex-end",
    fontStyle: "italic",
    fontFamily: "cursive",
    fontSize: "16px",
  },
  inputButtonStyle: {
    width: "38vw",
    padding: "10px",
    borderRadius: "32px",
    height: "32px",
    fontSize: "14px",
    border: "2px solid black",
  },
  locationBubble: {
    backgroundColor: "#d4f4ee",
    padding: "12px 16px",
    borderRadius: "12px",
    marginTop: "4px",
    cursor: "pointer",
    border: "1px solid #4a90a4",
  },
  fileBubble: {
    backgroundColor: "#fff3cd",
    padding: "12px 16px",
    borderRadius: "12px",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    border: "1px solid #ffc107",
  },
};

export default function ChatWindow({
  currentUserId,
  selectedUserId,
  setSelectedUser,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [userData, setUserData] = useState({});
  const [searchText, setSearchText] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch chat contacts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat-contacts/${currentUserId}`)
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  // Join chat room and load previous messages
  useEffect(() => {
    if (!selectedUserId) return;
    socket.emit("joinRoom", {
      senderId: currentUserId,
      receiverId: selectedUserId,
    });

    axios
      .get(`http://localhost:5000/chats/${currentUserId}/${selectedUserId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [selectedUserId, currentUserId]);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${selectedUserId}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (selectedUserId) {
      fetchUserDetails();
    }
  }, [selectedUserId]);

  // Listen for new incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUserId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: selectedUserId,
      message,
      type: "text",
    });

    setMessage("");
  };

  // Share location
  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = {
          latitude,
          longitude,
          address: `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`,

        };

        socket.emit("sendMessage", {
          senderId: currentUserId,
          receiverId: selectedUserId,
          message: JSON.stringify(locationMessage),
          type: "location",
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please check permissions.");
      }
    );
  };

const handleFileShare = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    alert("File size exceeds 10MB limit");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/upload-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const fileData = {
      fileName: file.name,
      fileUrl: response.data.url, // <-- FIXED: use 'url' from backend
      fileSize: (file.size / 1024).toFixed(2) + " KB",
    };

    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: selectedUserId,
      message: JSON.stringify(fileData),
      type: "file",
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Failed to upload file");
  }

  event.target.value = "";
};

  const lastMessageTime = (time) => {
    const date = new Date(time);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    const isThisWeek =
      date > weekStart && date < now && !isToday && !isYesterday;

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;
    } else if (isThisWeek) {
      return date.toLocaleDateString([], { weekday: "long" });
    } else {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  };

const renderMessage = (msg) => {
  // 1. Detect location message
  if (
    msg.location ||
    (typeof msg.message === "string" &&
      (() => {
        try {
          const obj = JSON.parse(msg.message);
          return obj && typeof obj === "object" && "latitude" in obj && "longitude" in obj;
        } catch {
          return false;
        }
      })())
  ) {
    let location = msg.location;
    if (!location) {
      try {
        location = JSON.parse(msg.message);
      } catch {
        return <span>{msg.message}</span>;
      }
    }
    const mapUrl = `https://static-maps.yandex.ru/1.x/?lang=en-US&ll=${location.longitude},${location.latitude}&z=15&size=300,150&l=map&pt=${location.longitude},${location.latitude},pm2rdm`;
    return (
      <div
        style={styles.locationBubble}
        onClick={() =>
          window.open(
            `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
            "_blank"
          )
        }
        title="Click to open in Google Maps"
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <MdLocationOn style={{ marginRight: "8px", verticalAlign: "middle" }} />
          <span>
            📍 {location.address || `Lat: ${location.latitude}, Long: ${location.longitude}`}
          </span>
        </div>
        <img
          src={mapUrl}
          alt="Location preview"
          style={{ width: "100%", borderRadius: "8px", cursor: "pointer" }}
        />
      </div>
    );
  }

  // 2. Detect file message (handles both with and without fileUrl)
  if (
    msg.fileName ||
    (typeof msg.message === "string" &&
      (() => {
        try {
          const obj = JSON.parse(msg.message);
          return obj && typeof obj === "object" && "fileName" in obj;
        } catch {
          return false;
        }
      })())
  ) {
    let fileData = msg;
    if (!msg.fileName) {
      try {
        fileData = JSON.parse(msg.message);
      } catch {
        return <span>{msg.message}</span>;
      }
    }
    // If fileUrl is present, show as a link, else just show file info
    return fileData.fileUrl ? (
      <a
        href={fileData.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
        download
      >
        <div style={styles.fileBubble}>
          <MdAttachFile style={{ fontSize: "20px", flexShrink: 0 }} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontWeight: "600", wordBreak: "break-word" }}>
              {fileData.fileName}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {fileData.fileSize || fileData.fileType || ""}
            </div>
          </div>
        </div>
      </a>
    ) : (
      <div style={styles.fileBubble}>
        <MdAttachFile style={{ fontSize: "20px", flexShrink: 0 }} />
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontWeight: "600", wordBreak: "break-word" }}>
            {fileData.fileName}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {fileData.fileSize || fileData.fileType || ""}
          </div>
        </div>
      </div>
    );
  }

  // 3. Default: text message
  return <span>{msg.message}</span>;
};

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #eee",
          background: "#d4f4ee",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4
          style={{
            margin: "8px auto 8px 16px",
            fontFamily: "cursive",
            fontStyle: "cursive",
          }}
        >
          Chats
        </h4>
        <div style={{ margin: "0px auto 8px 6px", position: "relative" }}>
          <input
            style={{
              padding: "10px 36px 10px 16px",
              borderRadius: "16px",
              border: "1.2px solid black",
              height: "40px",
              fontSize: "14px",
              color: "black",
            }}
            placeholder="Search"
            type="search"
          />
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.userId}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 0px 8px 16px",
              cursor: "pointer",
              background:
                selectedUserId === contact.userId ? "white" : "transparent",
            }}
            onClick={() => {
              if (selectedUserId !== contact.userId)
                setSelectedUser(contact.userId);
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {contact?.profilePhoto &&
              contact?.profilePhoto !== "undefined" ? (
                <img
                  src={contact.profilePhoto}
                  height="48px"
                  width="48px"
                  style={{ borderRadius: "50%" }}
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
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {(contact.username || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    fontFamily: "cursive",
                    fontStyle: "italic",
                  }}
                >
                  {contact.username}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  gap: "8px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "0.95em",
                    color: "#555",
                    textAlign: "center",
                    margin: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "140px",
                  }}
                >
                  {contact.lastMessage}
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    color: "#999",
                    lineHeight: "25px",
                    alignSelf: "flex-end",
                  }}
                >
                  {lastMessageTime(contact.time)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, padding: "16px", height: "70vh" }}>
        <div
          className="chat-header"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {userData?.profilePhoto &&
            userData?.profilePhoto !== "undefined" ? (
              <img
                src={userData.profilePhoto}
                height="48px"
                width="48px"
                style={{ borderRadius: "50%" }}
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
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {(userData.username || "U")
                  .split(" ")
                  .map((n) => n[0])
                  .join(" ")
                  .toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "cursive",
                fontStyle: "italic",
              }}
            >
              {userData.username}
            </span>
          </div>
        </div>
        <div className="body" style={{ marginTop: "16px" }}>
          <div
            style={{
              background: "#fbdea9",
              color: "black",
              borderRadius: "24px",
              margin: "auto",
              padding: "8px 16px",
              width: "fit-content",
              fontSize: "0.85em",
            }}
          >
            Messages in this chat are end-to-end encrypted
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "16px",height:"67%",overflowY:"auto" }}
          ref={messagesEndRef}
        >
          {messages.map((msg, i) => (
            <div
              style={{
                alignSelf:
                  msg.senderId === currentUserId ? "flex-end" : "flex-start",
                margin: "4px 0",
                display: "flex",
                flexDirection: "column",
              }}
              key={i}
            >
              <div
                style={
                  msg.senderId === currentUserId
                    ? styles.currUserStyle
                    : styles.senderStyle
                }
              >
                {renderMessage(msg)}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  alignSelf:
                    msg.senderId === currentUserId ? "flex-end" : "flex-start",
                  marginLeft: msg.senderId === currentUserId ? "0" : "16px",
                  marginRight: msg.senderId === currentUserId ? "16px" : "0",
                }}
              >
                {lastMessageTime(msg.timestamp)}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            width: "100%",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            style={styles.inputButtonStyle}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type something..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            onClick={shareLocation}
            title="Share Location"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <MdLocationOn style={{ height: "24px", width: "24px", color: "#d4a574" }} />
          </button>
          <button
            onClick={() => document.getElementById("fileInput").click()}
            title="Share File"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <MdAttachFile style={{ height: "24px", width: "24px", color: "#ffc107" }} />
          </button>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileShare}
            style={{ display: "none" }}
          />
          <button
            onClick={sendMessage}
            style={{ border: "none", background: "none" }}
          >
            <IoIosSend style={{ height: "24px", width: "24px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}