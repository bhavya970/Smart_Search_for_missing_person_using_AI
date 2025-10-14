import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function ChatWindow({
  currentUserId,
  selectedUser,
  setSelectedUser,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Fetch chat contacts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat-contacts/${currentUserId}`)
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  // Join chat room and load previous messages
  useEffect(() => {
    if (!selectedUser) return;
    socket.emit("joinRoom", {
      senderId: currentUserId,
      receiverId: selectedUser.uploadedUser,
    });

    axios
      .get(
        `http://localhost:5000/chats/${currentUserId}/${selectedUser.uploadedUser}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [selectedUser, currentUserId]);

  // Listen for new incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      senderId: currentUserId,
      receiverId: selectedUser.uploadedUser,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #eee",
          background: "#d4f4ee",
          overflowY: "auto",
        }}
      >
        <h4>Chats</h4>
        {contacts.map((contact) => (
          <div
            key={contact.userId}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              cursor: "pointer",
              background:
                selectedUser?.uploadedUser === contact.userId
                  ? "#e6e6ff"
                  : "transparent",
            }}
            onClick={() =>
              setSelectedUser({
                uploadedUser: contact.userId,
                name: contact.username,
              })
            }
          >
            <img
              src={contact.profilePhoto || "https://via.placeholder.com/40"}
              alt={contact.username}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 12,
              }}
            />
            <div>
              <div style={{ fontWeight: "bold" }}>{contact.username}</div>
              <div style={{ fontSize: "0.95em", color: "#555" }}>
                {contact.lastMessage}
              </div>
              <div style={{ fontSize: "0.85em", color: "#999" }}>
                {new Date(contact.time).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, padding: "16px" }}>
        <h3>Chat with {selectedUser?.name}</h3>
        <div>
          {messages.map((msg, i) => (
            <div key={i}>
              <strong>
                {msg.senderId === currentUserId ? "You" : selectedUser.name}:
              </strong>{" "}
              {msg.message}
            </div>
          ))}
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
