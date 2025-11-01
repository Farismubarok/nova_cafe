import React, { useState } from "react";
import "./payment.css";
import icedCoffee from "../../assets/image/iced-coffee.jpg";

const Payment = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("Pickup di Toko");
  const [paymentMethod, setPaymentMethod] = useState("OVO");
  const [promoCode, setPromoCode] = useState("");

  const subtotal = 92000;
  const tax = subtotal * 0.1;
  const shipping = 0; // Free Pickup
  const total = subtotal + tax + shipping;

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Left Column */}
        <div className="left-section">
          {/* Ringkasan Pesanan */}
          <div className="order-summary">
            <h3>Ringkasan Pesanan</h3>
            <div className="order-item">
              <img src={icedCoffee} alt="Iced Coffee" />
              <div className="item-info">
                <h4>Iced Coffee</h4>
                <p>Small</p>
                <p>Caramel Drizzle</p>
                <p>Qty: 1</p>
              </div>
              <div className="item-price">Rp. 45.000</div>
            </div>

            <div className="order-item">
              <img src={icedCoffee} alt="Iced Coffee" />
              <div className="item-info">
                <h4>Iced Coffee</h4>
                <p>Small</p>
                <p>Caramel Drizzle</p>
                <p>Qty: 1</p>
              </div>
              <div className="item-price">Rp. 45.000</div>
            </div>
          </div>

          {/* Informasi Pengiriman */}
          <div className="shipping-info">
            <h3>Informasi Pengiriman</h3>
            <div className="delivery-method">
              <label>Metode Pengambilan</label>
              <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option>Pickup di Toko</option>
                <option>Delivery</option>
              </select>
            </div>
            <p className="delivery-time">⏱ Estimasi waktu: 15–20 menit</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-section">
          <div className="payment-summary">
            <h3>Ringkasan Pembayaran</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>Rp. {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="summary-item">
              <span>Pajak PPN (10%)</span>
              <span>Rp. {tax.toLocaleString("id-ID")}</span>
            </div>
            <div className="summary-item">
              <span>Ongkos Kirim</span>
              <span className="free">Free Pickup</span>
            </div>

            <div className="promo-section">
              <label htmlFor="promo">Kode Promo</label>
              <div className="promo-input">
                <input
                  id="promo"
                  type="text"
                  placeholder="Masukkan kode promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button>Pakai</button>
              </div>
            </div>

            <div className="total-section">
              <p>Total Pembayaran</p>
              <h3>Rp. {total.toLocaleString("id-ID")}</h3>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="payment-methods">
            <h3>Metode Pembayaran</h3>
            {["OVO", "GoPay", "DANA", "BCA Virtual Account", "Mandiri Virtual Account", "BNI Virtual Account", "Kartu Kredit/Debit"].map(
              (method) => (
                <label
                  key={method}
                  className={`payment-option ${
                    paymentMethod === method ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {method}
                </label>
              )
            )}
          </div>

          <div className="terms">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">
              Saya telah membaca dan menyetujui syarat dan ketentuan yang
              berlaku
            </label>
          </div>

          <button className="confirm-btn">Konfirmasi Pembayaran</button>
          <p className="secure-text">🔒 Pembayaran aman & terenkripsi</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
