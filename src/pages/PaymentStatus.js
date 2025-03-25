import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io('http://localhost:1000/')
const PaymentStatus = ({uri}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");
  const [countdown, setCountdown] = useState(30);

  const query = new URLSearchParams(location.search);
  const tx_ref = query.get("tx_ref");
  const offer_id = query.get("offer_id")
  const userId = query.get("user_id")

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`${uri}payment/verify?tx_ref=${tx_ref}`);
        const data = await response.json();
        console.log(data)
        if (data.status == "successful") {
          socket.emit('accept_offer', {offer_id, tx_ref})
          setStatus("success");
          // Handle successful payment (e.g., update the order status in your database)
        } else if (data.status == "pending"){
          setStatus("pending")
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        
          return () => clearInterval(interval);
        }else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    if (tx_ref) {
      verifyPayment();
    } else {
      setStatus("invalid");
    }
  }, [tx_ref]);

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {status === "checking" && <p>Checking payment status...</p>}
      {status === "success" && (
        <div>
          <h2>Payment Successful ✅</h2>
          <p>
            Your transaction has been completed. Kindly go back to your Inbox
          </p>
          <button className="btn btn-dark" onClick={() => navigate(`/chat-room/${userId}`)}>Go to Inbox</button>
        </div>
      )}
      {status == "pending" && (
        <div>
          <h2>Payment Processing ⏳</h2>
          <p>
            Your payment is being processed. This may take a few moments. If you experience any issues, please contact support
          </p>
          {countdown > 0 ? (
          <p>Refreshing in {countdown} seconds...</p>
        ) : (
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Refresh Now
          </button>
        )}
        </div>
      )}
      {status === "failed" && (
        <div>
          <h2>Payment Failed ❌</h2>
          <p>
            To Retry the Payment, kindly go to your Inbox and accept the offer again.
          </p>
          <button className="btn btn-dark" onClick={() => navigate(`/chat-room/${userId}`)}>Go to Inbox</button>
        </div>
      )}
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </div>
  );
};

export default PaymentStatus;
