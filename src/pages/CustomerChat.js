import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io('http://localhost:1000/');

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

  useEffect(() => {
    if(hasFetched.current) return;
    hasFetched.current = true;
    socket.emit("userOnline", params.id);
    axios.get(`${uri}quote/verify/${params.id}`).then(res=>{
      setIsVerifying(false)
      if(res.data.verified){
        socket.emit("getMessage", params.id);
        socket.on("messageHistory", (history) => {
          setMessages(history);
        });
        socket.on("message", (message) => {          
          if (message.sender == params.id) {
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(msg => msg.timestamp === message.timestamp && msg.text === message.text);
              return isDuplicate ? prevMessages : [...prevMessages, message]
            });
          } else if(message.receiver == params.id){
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(msg => msg.timestamp === message.timestamp && msg.text === message.text);
              return isDuplicate ? prevMessages : [...prevMessages, message]
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
      const newMessage = { text: input, sender: params.id, timestamp: new Date().toISOString() };
      socket.emit("sendMessage", { receiver: 'Admin', message: newMessage });
      setInput("");      
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              <div className="p-2 rounded" style={{ backgroundColor: msg.sender !== "Admin" ? "#DCF8C6" : "#EAEAEA", maxWidth: "70%" }}>
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
  );
};

export default CustomerChat;