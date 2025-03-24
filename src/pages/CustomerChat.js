import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import getSymbolFromCurrency from "currency-symbol-map";

const socket = io(process.env.REACT_APP_BASEURL);

const CustomerChat = (props) => {
  const { uri } = props
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");  
  const chatEndRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(true)
  const params = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const hasFetched = useRef(false)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [user, setUser] = useState({})
  const [rejecting, setRejecting] = useState(false)

  useEffect(() => {
    if(hasFetched.current) return;
    hasFetched.current = true;
    socket.emit("userOnline", params.id);
    socket.on('offerStatus', (history)=>{
      setMessages(history)
    })

    axios.get(`${uri}quote/verify/${params.id}`).then(res=>{
      setIsVerifying(false)
      if(res.data.verified){
        setUser(res.data.quote)
        socket.emit("getMessage", params.id);
        socket.on("messageHistory", (history) => {
          setMessages(history);
        });
        socket.on("message", (message) => {   
          setRejecting(false)       
          if (message.sender == params.id) {
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(msg => msg.timestamp === message.timestamp && msg.text === message.text);              
              return isDuplicate ? prevMessages.map(msg => msg._id === message._id && msg.type == 'offer' ? message : msg) : [...prevMessages, message]
            });
          } else if(message.receiver == params.id){
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(msg => msg.timestamp === message.timestamp && msg.text === message.text);
              return isDuplicate ? prevMessages.map(msg => msg._id === message._id && msg.type == 'offer' ? message : msg) : [...prevMessages, message]
            });
          } else {
            console.log('Not my own message')
          }          
        });
        socket.on("onlineUsers", (users) => {
          setOnlineUsers(users); // Update online users list
        });
    
        return () => {
          socket.off("messageHistory");
          socket.off("message");
          socket.disconnect();
        };
      }else navigate('/request-quote')
    }).catch(err=>{
      console.log(err)
      setIsVerifying(false)
      setError(true)
    })
  }, [params]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: params.id, timestamp: new Date().toISOString(), type: 'text' };      
      socket.emit("sendMessage", { receiver: 'Admin', message: newMessage });
      setInput("");      
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const rejectOffer = (id)=>{
    setRejecting(true)
    socket.emit('reject_offer', id)
  }

  const navigateToPayment = (offer) => {
    const secretKey = "your-secret-key"; // Store this securely
    const data = {
      description: offer.description,
      price: offer.price,
      currency: offer.currency,
      email: user.email,
      name: user.fullname,
      title: offer.title,
      id: user._id,
      msg_id: offer._id
    };
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    navigate("/payment", { state: { encryptedData } });
  };
  return (
    <div className="container-fluid vh-75 d-flex flex-column bg-light text-dark">
      <div className="bg-dark text-white p-3">
        PaxDav Tech Support
        {
          onlineUsers.find(each=>each == 'Admin')
          ?
          <p className="my-0 text-success">Online</p>          
          :
          <p className="my-0">Last seen few moments ago</p>          
        }
      </div>
      <div className="flex-grow-1 p-3 overflow-auto" style={{ height: "70vh" }}>
        {
          isVerifying
          ?
          <p className="py-5 text-center text-muted fs-4">Setting up your chat... This won’t take long!</p>
          :
          !isVerifying && error
          ?
          <div className="text-center">
            <p className="text-danger text-center fs-4 pt-5">An Error has occured</p>
            <Button onClick={()=>window.location.reload()} className='bg-dark text-white fw-bold'>Refresh Now</Button>
          </div>
          :
          messages.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.sender !== "Admin" ? "justify-content-end" : "justify-content-start"} mb-2`}>              
                {msg.type === "offer" ? (
                  <div className="card shadow-sm" style={{ backgroundColor: "#fff", maxWidth: "70%" }}>
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <div>
                          {msg.title}
                        </div>
                        <div>
                          {getSymbolFromCurrency(msg.currency) + msg.price}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {msg.description}
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      {
                        msg.status && msg.status == 'withdrawn'
                        ?
                        <p className="text-muted">Offer Withdrawn</p>
                        :
                        msg.status && msg.status == 'accepted'
                        ?
                        <p className="text-muted">Offer Accepted</p>
                        :
                        msg.status && msg.status == 'rejected'
                        ?
                        <p className="text-muted">Offer Rejected</p>
                        :
                        <div>
                          <button onClick={()=>navigateToPayment(msg)} className="btn btn-dark mx-2">
                            Accept Offer
                          </button>
                          <button onClick={()=>rejectOffer(msg._id)} className="btn btn-outline-dark mx-2">
                            Reject Offer
                          </button>
                        </div>
                      }
                    </div>                    
                  </div>
                ) : (
                  <div className="p-3 rounded shadow-sm" style={{ backgroundColor: msg.sender !== "Admin" ? "#DCF8C6" : "#EAEAEA", maxWidth: "70%" }}>
                    <p className="mb-0">{msg.text}</p>
                    <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                )}
                
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
  );
};

export default CustomerChat;