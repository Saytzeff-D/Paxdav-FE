import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FlutterwaveButton, closePaymentModal } from "flutterwave-react-v3";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  let description = "";
  let price = "";
  
  if (location.state) {
    description = decryptData(location.state.description);
    price = decryptData(location.state.price);
  }

  const config = {
    public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    tx_ref: Date.now(),
    amount: price,
    currency: "USD",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: "customer@example.com",
      phone_number: "1234567890",
      name: "Customer Name",
    },
    customizations: {
      title: "Service Payment",
      description: description,
      logo: "https://your-logo-url.com/logo.png",
    },
    callback: (response) => {
      console.log(response);
      closePaymentModal();
      navigate("/chat");
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="mb-3 text-center">Confirm Payment</h4>
        <p><strong>Offer:</strong> {description}</p>
        <p><strong>Price:</strong> ${price}</p>
        <FlutterwaveButton {...config} className="btn btn-success w-100 mt-3">
          Pay Now
        </FlutterwaveButton>
        <Button variant="outlined" className="w-100 mt-2" onClick={() => navigate("/chat")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
