import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";

const socket = io(process.env.REACT_APP_BASEURL);

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState('');
  const [users, setUsers] = useState([]);
  const chatEndRef = useRef(null);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [offer, setOffer] = useState({ title: "", description: "", price: "", currency: "" });
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    socket.emit("userOnline", 'Admin');
    socket.emit("joinRoom");
    socket.emit("getMessage", activeUser._id);

    socket.on("users", (allUsers) => {
      setUsers(allUsers);
      setIsFetchingUsers(false);
    });

    socket.on("messageHistory", (history) => {
      setMessages(history);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("message", (message) => {
      if (message.sender === activeUser._id || message.receiver === activeUser._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("messageHistory");
      socket.off("message");
    };
  }, [activeUser]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const timeAgo = (pastDate)=> {    
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

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "Admin", timestamp: new Date().toISOString(), type: "text" };
      socket.emit("sendMessage", { receiver: activeUser._id, message: newMessage });
      setInput("");
    }
  };

  const sendOffer = () => {
    if (offer.title.trim() && offer.description.trim() && offer.price.trim() && offer.currency.trim()) {
      const newOffer = { title: offer.title, description: offer.description, price: offer.price, currency: offer.currency, sender: "Admin", timestamp: new Date().toISOString(), type: "offer" };
      socket.emit("sendMessage", { receiver: activeUser._id, message: newOffer });
      setOffer({ title: "", description: "", price: "", currency: "" });
      setShowOfferModal(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container-fluid vh-100 d-flex bg-light text-dark">
      <div className="col-md-3 bg-white p-3 border-end vh-100 d-flex flex-column">
        <h5 className="text-center mb-3">Chats</h5>
        <div className="overflow-auto flex-grow-1">
          {isFetchingUsers ? (
            <p className="fs-4 text-info">Fetching all Users and Quote. Please wait...</p>
          ) : users.length === 0 ? (
            <p>No Users yet...</p>
          ) : (
            users.map((user, index) => (
              <div
                key={index}
                className={`p-2 mb-2 d-flex align-items-center ${activeUser.fullname === user.fullname ? "bg-primary text-white" : "bg-light"}`}
                onClick={() => setActiveUser(user)}
                style={{ cursor: "pointer", borderRadius: "8px" }}
              >
                <i className="fa fa-user-circle me-2 text-muted"></i>
                <div className="flex-grow-1">
                  <span>{user.fullname}</span>
                  <small className={`d-block text-truncate ${activeUser.fullname === user.fullname ? "text-light" : "text-muted"}`} style={{ maxWidth: "150px" }}>
                    {user.lastMessage}
                  </small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
          {messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender === "Admin" ? "justify-content-end" : "justify-content-start"} mb-2`}>
              <div className="p-3 rounded shadow-sm" style={{ backgroundColor: msg.sender === "Admin" ? "#DCF8C6" : "#EAEAEA", maxWidth: "70%" }}>
                {msg.type === "offer" ? (
                  <div className="border p-2 rounded" style={{ backgroundColor: "#fff", borderLeft: "5px solid #ff9800" }}>
                    <p className="mb-1"><strong>Offer:</strong> {msg.description}</p>
                    <p className="mb-1"><strong>Price:</strong> ${msg.price}</p>
                    <Button variant="contained" color="success" size="small">Pay</Button>
                  </div>
                ) : (
                  <p className="mb-0">{msg.text}</p>
                )}
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="p-3 border-top d-flex flex-column align-items-center bg-white">   
          <div className="w-100 py-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>       
          <div className="d-flex w-100 justify-content-between">
            <Button variant="contained" color="primary" onClick={() => setShowOfferModal(true)} className="ms-2 me-3">Create an Offer</Button>          
            <Button variant="contained" color="primary" onClick={sendMessage} className="ms-2">Send</Button>
          </div>
        </div>
      </div>

      <Modal
          open={showOfferModal}                
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Offer
          </Typography>
          <div className="mt-4">
          <input
              type="text"
              className="form-control mb-2 bg-dark text-white"
              placeholder="Offer Title"
              value={offer.title}
              onChange={(e) => setOffer({ ...offer, title: e.target.value })}              
            />
            <textarea              
              className="form-control mb-2 bg-dark text-white"
              placeholder="Offer Description"
              value={offer.description}
              onChange={(e) => setOffer({ ...offer, description: e.target.value })}              
            />
            <input
              type="number"
              className="form-control mb-2 bg-dark text-white"
              placeholder="Price"
              value={offer.price}
              onChange={(e) => setOffer({ ...offer, price: e.target.value })}              
            />
            <select className="form-control mb-2 bg-dark text-white" onChange={(e) => setOffer({ ...offer, currency: e.target.value })}>
              <option>Select a currency</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>                    
          <div className='d-flex justify-content-around mt-4'>
            <Button variant="contained" onClick={() => setShowOfferModal(false)} className="me-2">Cancel</Button>
            <Button variant="contained" color="success" onClick={sendOffer}>Send Offer</Button>
          </div>
          </Box>
      </Modal>
    </div>
  );
};

export default AdminChat;