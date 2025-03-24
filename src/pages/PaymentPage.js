import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import CryptoJS from "crypto-js";
import getSymbolFromCurrency from "currency-symbol-map";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASEURL)

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const secretKey = "your-secret-key";
  let decryptedData = {};
  
  
  if (location.state?.encryptedData) {
    const bytes = CryptoJS.AES.decrypt(location.state.encryptedData, secretKey);
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
  }

  const config = {
    public_key: process.env.REACT_APP_FLW,
    tx_ref: Date.now(),
    amount: decryptedData.price,
    currency: decryptedData.currency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: decryptedData.email,      
      name: decryptedData.name,
    },
    customizations: {
      title: decryptedData.title.slice(0, 25),
      description: decryptedData.description,
      logo: process.env.REACT_APP_LOGO_URL,
    },
    callback: (response) => {
      console.log(response);
      socket.emit('accept_offer', decryptedData.msg_id)
      closePaymentModal();
      navigate(`/chat-room/${decryptedData.id}`);
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="mb-3 text-center text-dark">Confirm Payment</h4>
        <p className="text-dark"><strong>Offer:</strong> {decryptedData.description}</p>
        <p className="text-dark"><strong>Price:</strong> {getSymbolFromCurrency(decryptedData.currency) + decryptedData.price}</p>
        <FlutterWaveButton {...config} className="btn btn-success w-100 mt-3">
          Pay Now
        </FlutterWaveButton>
        <Button variant="outlined" className="w-100 mt-2" onClick={() =>navigate(`/chat-room/${decryptedData.id}`)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
