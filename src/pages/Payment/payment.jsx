// src/pages/Payment/payment.jsx (MODIFIED)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
// import { sizePrice, spicyPrice, icePrice } from "../../logic/DetailOrder"; 
import { orderService } from "../../services/orderService"; // 💡 IMPORT BARU
import "./payment.css";

// 💡 Helper function untuk rendering opsi dinamis (ditempatkan di luar komponen)
const excludeProps = ['key', 'id', 'name', 'img', 'price', 'quantity', 'toppings', 'notes', 'totalPrice', 'category'];

const renderSelectedOptions = (item) => {
  const optionsToRender = [];
  for (const key in item) {
    if (!excludeProps.includes(key) && typeof item[key] === 'string') {
      const displayName = key.charAt(0).toUpperCase() + key.slice(1);
      optionsToRender.push(<p key={key} style={{ margin: '3px 0', fontSize: '0.85rem', color: '#555' }}>{displayName}: {item[key]}</p>);
    }
  }
  return optionsToRender;
};

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("Pickup di Toko");
  const [paymentMethod, setPaymentMethod] = useState("OVO");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // ... (useEffect debug tetap sama) ...

  // Calculate totals
  const subtotal = getTotal();
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const shipping = deliveryMethod === "Delivery" ? 15000 : 0;
  const finalTotal = subtotal + tax + shipping;

  const handlePaymentConfirmation = async () => { // 💡 JADIKAN ASYNC
    if (!termsAccepted) {
      alert("Mohon setujui syarat dan ketentuan terlebih dahulu");
      return;
    }
    
    // Data yang akan dikirim ke backend
    const orderDetails = {
      finalTotal: finalTotal,
      items: cartItems,
      deliveryMethod,
      subtotal,
      tax,
      shipping,
      orderDate: new Date().toISOString()
    };
    
    try {
        // 💡 LANGKAH KRUSIAL: Kirim pesanan ke database
        const result = await orderService.createOrder(orderDetails, paymentMethod);
        
        const newOrderId = result.orderId;
        
        // Clear cart setelah berhasil disimpan di DB
        clearCart(); 

        // Navigate ke success page dengan data dari respons backend
        navigate("/payment-success", {
            state: {
                orderId: newOrderId,
                paymentMethod,
                totalAmount: finalTotal
            }
        });

    } catch (error) {
        console.error("Failed to confirm payment:", error);
        alert("Gagal menyimpan pesanan. Silakan coba lagi. " + error.message);
    }
  };

  // ... (Redirect if cart is empty tetap sama) ...
  if (cartItems.length === 0) {
    // ... (kode keranjang kosong) ...
  }


  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* LEFT SECTION */}
        <div className="left-section">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Ringkasan Pesanan</h3>
            
            {cartItems.map((item) => {
              return (
                <div key={item.key} className="order-item">
                  <img 
                    src={item.img || "https://via.placeholder.com/80"} 
                    alt={item.name} 
                  />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    
                    {/* 💡 RENDER OPSI DINAMIS */}
                    {renderSelectedOptions(item)}
                    
                    {item.toppings?.length > 0 && (
                      <p>Topping: {item.toppings.join(", ")}</p>
                    )}
                    {item.notes && item.notes.trim() !== "" && (
                      <p style={{ fontSize: "0.8rem", color: "#666", fontStyle: "italic" }}>
                        Catatan: {item.notes}
                      </p>
                    )}
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price-section">
                    <div className="item-price-label">Total Harga</div>
                    <div className="item-price">
                      Rp. {item.totalPrice.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipping Info */}
          <div className="shipping-info">
            <h3>👤 Informasi Pengiriman</h3>
            
            <div className="delivery-method">
              <strong>Metode Pengambilan</strong>
              <select 
                value={deliveryMethod} 
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option>Pickup di Toko</option>
                <option>Delivery</option>
              </select>
            </div>

            <div className="delivery-time">
              <span>🕐</span> Estimasi waktu: 15-20 menit
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
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
              <span className="free">
                {shipping === 0 ? "Free Pickup" : `Rp. ${shipping.toLocaleString("id-ID")}`}
              </span>
            </div>

            <div className="promo-section">
              <div className="promo-label">
                🏷️ Kode Promo
              </div>
              <div className="promo-input">
                <input 
                  type="text" 
                  placeholder="Masukkan kode promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button>Pakai</button>
              </div>
            </div>

            <div className="total-section">
              <span>Total Pembayaran</span>
              <span>Rp. {finalTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Payment Methods (tetap sama) */}
          <div className="payment-methods">
            <h3>Metode Pembayaran</h3>
            
            <div 
              className={`payment-option ${paymentMethod === "OVO" ? "active" : ""}`}
              onClick={() => setPaymentMethod("OVO")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="ovo" 
                checked={paymentMethod === "OVO"}
                onChange={() => setPaymentMethod("OVO")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">📱</div>
                <label htmlFor="ovo" className="payment-label">OVO</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "GoPay" ? "active" : ""}`}
              onClick={() => setPaymentMethod("GoPay")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="gopay" 
                checked={paymentMethod === "GoPay"}
                onChange={() => setPaymentMethod("GoPay")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">📱</div>
                <label htmlFor="gopay" className="payment-label">GoPay</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "DANA" ? "active" : ""}`}
              onClick={() => setPaymentMethod("DANA")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="dana" 
                checked={paymentMethod === "DANA"}
                onChange={() => setPaymentMethod("DANA")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">📱</div>
                <label htmlFor="dana" className="payment-label">DANA</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "BCA Virtual Account" ? "active" : ""}`}
              onClick={() => setPaymentMethod("BCA Virtual Account")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="bca" 
                checked={paymentMethod === "BCA Virtual Account"}
                onChange={() => setPaymentMethod("BCA Virtual Account")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">🏦</div>
                <label htmlFor="bca" className="payment-label">BCA Virtual Account</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "Mandiri Virtual Account" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Mandiri Virtual Account")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="mandiri" 
                checked={paymentMethod === "Mandiri Virtual Account"}
                onChange={() => setPaymentMethod("Mandiri Virtual Account")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">🏦</div>
                <label htmlFor="mandiri" className="payment-label">Mandiri Virtual Account</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "BNI Virtual Account" ? "active" : ""}`}
              onClick={() => setPaymentMethod("BNI Virtual Account")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="bni" 
                checked={paymentMethod === "BNI Virtual Account"}
                onChange={() => setPaymentMethod("BNI Virtual Account")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">🏦</div>
                <label htmlFor="bni" className="payment-label">BNI Virtual Account</label>
              </div>
            </div>

            <div 
              className={`payment-option ${paymentMethod === "Kartu Kredit/Debit" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Kartu Kredit/Debit")}
            >
              <input 
                type="radio" 
                name="payment" 
                id="card" 
                checked={paymentMethod === "Kartu Kredit/Debit"}
                onChange={() => setPaymentMethod("Kartu Kredit/Debit")}
              />
              <div className="payment-option-content">
                <div className="payment-icon">💳</div>
                <label htmlFor="card" className="payment-label">Kartu Kredit/Debit</label>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="terms">
            <input 
              type="checkbox" 
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              Saya telah membaca dan menyetujui <a href="#">syarat dan ketentuan</a> yang berlaku.
            </label>
          </div>

          {/* Confirm Button */}
          <button className="confirm-btn" onClick={handlePaymentConfirmation}>
            🛍️ Konfirmasi Pembayaran
          </button>

          <div className="secure-text">
            🔒 Pembayaran aman & terenkripsi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;