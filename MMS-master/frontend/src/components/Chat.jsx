import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const Chat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.emit("userOnline", userId);

    // Fetch previous messages
    axios.get(`http://localhost:5000/chat/${userId}/${receiverId}`).then((res) => {
      setMessages(res.data);
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = { senderId: userId, receiverId, message: newMessage };

      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");

      axios.post("http://localhost:5000/chat", messageData).catch(console.error);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.senderId === userId ? styles.sentMessage : styles.receivedMessage}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div style={styles.chatInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  sentMessage: {
    textAlign: "right",
    backgroundColor: "#d1e7dd",
    padding: "8px",
    margin: "5px",
    borderRadius: "10px",
    display: "inline-block",
    maxWidth: "70%",
  },
  receivedMessage: {
    textAlign: "left",
    backgroundColor: "#f8d7da",
    padding: "8px",
    margin: "5px",
    borderRadius: "10px",
    display: "inline-block",
    maxWidth: "70%",
  },
  chatInput: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    flexGrow: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default Chat;
