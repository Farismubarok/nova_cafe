// File: src/pages/PaymentSuccess/PaymentSuccess.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const orderId = state?.orderId || Math.floor(Math.random() * 90000) + 10000;
  const paymentMethod = state?.paymentMethod || "E-wallet / Go-Pay";
  const totalAmount = state?.totalAmount || 0;

  return (
    <div className="payment-success-page">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 100 100" className="checkmark">
            <circle cx="50" cy="50" r="45" fill="#065f46" />
            <path
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              d="M30 50 L45 65 L70 35"
            />
          </svg>
        </div>

        <h2 className="success-title">Pembayaran Berhasil</h2>
        <p className="success-subtitle">
          Terima kasih, Pesanan anda sedang di proses
        </p>

        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Id Pesanan :</span>
            <span className="detail-value">#{orderId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Metode Pembayaran :</span>
            <span className="detail-value">{paymentMethod}</span>
          </div>
        </div>

        <hr className="divider" />

        <div className="total-section">
          <span className="total-label">Total Pembayaran :</span>
          <span className="total-value">
            Rp. {totalAmount.toLocaleString("id-ID")}
          </span>
        </div>

        <button className="back-home-btn" onClick={() => navigate("/menu")}>
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;