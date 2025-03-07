import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:1000");

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState("John Doe");
  const users = ["John Doe", "Jane Smith", "Mark Lee", "Sarah Connor"];
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", activeUser);
    socket.on("messageHistory", (history) => {
      setMessages(history);
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [activeUser]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "You", timestamp: new Date().toISOString() };
      socket.emit("sendMessage", { user: activeUser, message: newMessage });
      setInput("");
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container-fluid vh-100 d-flex bg-black text-white">
      {/* Sidebar */}
      <div className="col-md-3 bg-dark p-3 border-end border-secondary vh-100 d-flex flex-column">
        <h5 className="text-center mb-3 flex-shrink-0">Chats</h5>
        <div className="overflow-auto flex-grow-1">
          {users.map((user, index) => (
            <div
              key={index}
              className={`p-2 mb-2 rounded ${activeUser === user ? "bg-secondary" : ""}`}
              onClick={() => setActiveUser(user)}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-user-circle me-2"></i> {user}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="col-md-9 d-flex flex-column">
        <div className="bg-dark text-white p-3 border-bottom border-secondary">
          <h6>{activeUser}</h6>
        </div>
        <div className="flex-grow-1 p-3 overflow-auto" style={{ height: "70vh" }}>
          {messages.reduce((acc, msg, index) => {
            const msgDate = formatDate(msg.timestamp);
            const prevMsgDate = index > 0 ? formatDate(messages[index - 1].timestamp) : null;
            
            if (msgDate !== prevMsgDate) {
              acc.push(
                <div key={`date-${index}`} className="text-center text-muted my-2">
                  <small className="bg-dark text-white px-3 py-1 rounded">{msgDate}</small>
                </div>
              );
            }
            acc.push(
              <div key={index} className={`d-flex ${msg.sender === "You" ? "justify-content-end" : "justify-content-start"} mb-2`}>
                <div className="p-2 rounded" style={{ backgroundColor: msg.sender === "You" ? "#01D564" : "#333", maxWidth: "70%" }}>
                  <strong>{msg.sender}</strong>
                  <p className="mb-0">{msg.text}</p>
                  <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              </div>
            );
            return acc;
          }, [])}
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-3 border-top border-secondary d-flex">
          <input
            type="text"
            className="form-control me-2 bg-dark text-white border-secondary"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn text-white" style={{ backgroundColor: "#01D564" }} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;