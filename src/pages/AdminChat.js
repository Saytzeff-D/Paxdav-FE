import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BASEURL);

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});  
  const chatEndRef = useRef(null);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("userOnline", 'Admin');
    socket.emit("joinRoom");
    socket.emit("getMessage", activeUser._id);

    socket.on("users", (allUsers)=>{
      setUsers(allUsers)   
      setIsFetchingUsers(false)               
    })
    
    socket.on("messageHistory", (history) => {
      setMessages(history);
      const lastMsgMap = {};
      history.forEach((msg) => {
        lastMsgMap[msg.sender] = msg.text;
      });
      setLastMessages(lastMsgMap);
    });
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users); // Update online users list
    });
    
    socket.on("message", (message) => {      
      if (message.sender == activeUser._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      } else if(message.receiver == activeUser._id){
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.log('Not my own message')
      }
      // setLastMessages((prev) => ({ ...prev, [message.sender]: message.text }));      
    });    
    
    return () => {
      socket.off("messageHistory");
      socket.off("message");
      socket.off("users");
    };
  }, [activeUser]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "Admin", timestamp: new Date().toISOString() };
      socket.emit("sendMessage", { receiver: activeUser._id, message: newMessage });
      setLastMessages((prev) => ({ ...prev, [activeUser]: input }));
      setInput("");      
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function timeAgo(pastDate) {    
    const now = new Date();
    const past = new Date(pastDate)
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    console.log(seconds, minutes, hours, days)
    if (seconds < 10) {
      return "Just now"
    } else if (seconds < 60) {
      return `${seconds} seconds ago`
    } else if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else if (days < 7) {
      return `${days} days ago`
    } else return new Date(pastDate).toLocaleDateString(); // Show the full date if older than a week
}

  return (
    <div className="container-fluid vh-100 d-flex bg-light text-dark">
      {/* Sidebar */}
      <div className="col-md-3 bg-white p-3 border-end vh-100 d-flex flex-column">
        <h5 className="text-center mb-3">Chats</h5>
        <div className="overflow-auto flex-grow-1">
          {
            isFetchingUsers
            ?
            <p className="fs-4 text-info">Fetching all Users and Quote. Please wait...</p>
            :
            users.length == 0
            ?
            <p>No Users yet...</p>
            :
            users.map((user, index) => (
              <div
                key={index}
                className={`p-2 mb-2 d-flex align-items-center ${activeUser.fullname === user.fullname ? "bg-primary text-white" : "bg-light"}`}
                onClick={() => {
                  setActiveUser(user)             
                }}
                style={{ cursor: "pointer", borderRadius: "8px" }}
              >
                <i className={`fa fa-user-circle me-2 text-muted`}></i>
                <div className="flex-grow-1">
                  <span>{user.fullname}</span>
                  {/* <small className="d-block text-muted text-truncate" style={{ maxWidth: "150px" }}>
                    {lastMessages[user] || "No messages"}
                  </small> */}
                </div>              
              </div>
            ))
          }
        </div>
      </div>

      {/* Chat Window */}
      <div className="col-md-9 d-flex flex-column bg-light">
        <div className="bg-white p-3 border-bottom">
          <h6>{activeUser.fullname}</h6>
          {
            activeUser !== '' && onlineUsers.find(each=>each == activeUser._id)
            ?
            <p className="my-0 text-success">Online</p>
            :
            activeUser !== ''
            ?
            <p className="my-0">Last seen {timeAgo(activeUser.lastActive)}</p>
            :
            ''
          }
        </div>
        <div className="flex-grow-1 p-3 overflow-auto" style={{ height: "70vh" }}>
          {
            activeUser == ''
            ?
            <p className="text-center text-muted py-5 fs-4">Select a user to message...</p>
            :
            messages.map((msg, index) => (
              <div key={index} className={`d-flex ${msg.sender === "Admin" ? "justify-content-end" : "justify-content-start"} mb-2`}>
                <div className="p-2 rounded" style={{ backgroundColor: msg.sender === "Admin" ? "#DCF8C6" : "#EAEAEA", maxWidth: "70%" }}>
                  <p className="mb-0">{msg.text}</p>
                  <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              </div>
            ))
          }
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-3 border-top d-flex bg-white">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;