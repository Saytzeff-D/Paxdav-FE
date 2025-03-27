import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CryptoJS from "crypto-js";
import getSymbolFromCurrency from "currency-symbol-map";
import PaxDav from '../assets/navbar_brand.png'

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const secretKey = "your-secret-key";
  const [decryptedData, setDecryptedData] = useState({})
  const [flutterwaveLink, setFlutterwaveLink] = useState('')
  const flutterwaveFee = decryptedData.currency == 'NGN' ? 1.4 / 100 * decryptedData.amount : 3.8 / 100 * decryptedData.amount
  const vat = Math.ceil(7.5 / 100 * flutterwaveFee)
  
  useEffect(()=>{
    if (location.state?.flwLink) {
      console.log(location.state)
      setFlutterwaveLink(location.state.flwLink)
      const bytes = CryptoJS.AES.decrypt(location.state.encryptedData, secretKey);
      setDecryptedData(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))    
    }else navigate('/request-quote')
  }, [])

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
      <div className="card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="bg-dark">
            <img src={PaxDav} alt="Logo" style={{ height: "50px" }} />
          </div>
          <h4 className="mt-2 text-dark fw-bold">Review & Confirm Payment</h4>
        </div>
        <div className="bg-light p-3 rounded-3 shadow-sm mb-3">
          <h6 className="text-muted">Offer Details</h6>
          <p className="text-dark fs-6 mb-1"><strong>{decryptedData.title}</strong></p>
          <p className="text-dark fs-6 mb-1">{decryptedData.description}</p>
        </div>
        <div className="bg-light p-3 rounded-3 shadow-sm mb-3">
          <h6 className="text-muted">Billing Details</h6>
          <p className="text-dark fs-6 mb-1"><strong>Name:</strong> {decryptedData.name}</p>
          <p className="text-dark fs-6 mb-1"><strong>Email:</strong> {decryptedData.email}</p>
        </div>
        <div className="bg-light p-3 rounded-3 shadow-sm mb-3">
          <h6 className="text-muted">Payment Summary</h6>
          <p className="text-dark fs-6 mb-1"><strong>Subtotal:</strong> {getSymbolFromCurrency(decryptedData.currency)}{decryptedData.amount}</p>
          <p className="text-dark fs-6 mb-1"><strong>VAT:</strong> {getSymbolFromCurrency(decryptedData.currency)}{parseFloat(vat)}</p>
          <p className="text-dark fs-5 fw-bold mb-0"><strong>Total:</strong> {getSymbolFromCurrency(decryptedData.currency)}{parseFloat(vat + parseFloat(decryptedData.amount))}</p>
        </div>
        <button onClick={() => window.location.href = flutterwaveLink} className="btn btn-success w-100 mt-3">
          Pay Now
        </button>
        <Button
          variant="outlined"
          className="w-100 mt-2 py-2 rounded-3 text-dark border-secondary"
          onClick={() => navigate(`/chat-room/${decryptedData.id}`)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
