import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  const location = useLocation();
  const { total, items } = location.state || { total: 0, items: [] }; // Retrieve total and items from state

  const [deliveryMethod, setDeliveryMethod] = useState("Pickup di Toko");
  const [paymentMethod, setPaymentMethod] = useState("OVO");

  const subtotal = total; // Use the total passed from the cart
  const tax = subtotal * 0.1; // 10% tax
  const shipping = 0; // Free Pickup
  const finalTotal = subtotal + tax + shipping;

  return (
    <div className="payment-page">
      <h2>Halaman Pembayaran</h2>
      <div className="payment-container">
        <div className="order-summary">
          <h3>Ringkasan Pesanan</h3>
          {items.map((item) => (
            <div key={item.key}>
              <p>{item.name} - Qty: {item.quantity} - Rp. {item.totalPrice.toLocaleString("id-ID")}</p>
            </div>
          ))}
          <p>Subtotal: Rp. {subtotal.toLocaleString("id-ID")}</p>
          <p>Pajak (10%): Rp. {tax.toLocaleString("id-ID")}</p>
          <p>Total: Rp. {finalTotal.toLocaleString("id-ID")}</p>
        </div>

        <div className="delivery-method">
          <h3>Metode Pengiriman</h3>
          <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
            <option>Pickup di Toko</option>
            <option>Delivery</option>
          </select>
        </div>

        <div className="payment-method">
          <h3>Metode Pembayaran</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>OVO</option>
            <option>GoPay</option>
            <option>DANA</option>
            <option>Kartu Kredit/Debit</option>
          </select>
        </div>

        <button className="confirm-btn">Konfirmasi Pembayaran</button>
        <p className="secure-text">🔒 Pembayaran aman & terenkripsi</p>
      </div>
    </div>
  );
};

export default Payment;
