import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { sizePrice, spicyPrice, icePrice } from "../../logic/DetailOrder";
import "./payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("Pickup di Toko");
  const [paymentMethod, setPaymentMethod] = useState("OVO");

  // Debug: Log cart items saat component mount
  useEffect(() => {
    console.log("=== Payment Page Debug ===");
    console.log("Cart Items:", cartItems);
    cartItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        name: item.name,
        unitPrice: item.unitPrice,
        portion: item.portion,
        spicy: item.spicy,
        ice: item.ice,
        toppingPrice: item.toppingPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        toppings: item.toppings
      });
    });
    console.log("======================");
  }, [cartItems]);

  // Calculate totals
  const subtotal = getTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = deliveryMethod === "Delivery" ? 15000 : 0;
  const finalTotal = subtotal + tax + shipping;

  const handlePaymentConfirmation = () => {
    const orderId = Math.floor(Math.random() * 90000) + 10000;
    const orderDetails = {
      orderId,
      items: cartItems,
      deliveryMethod,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      finalTotal,
      orderDate: new Date().toISOString()
    };

    console.log("Processing order:", orderDetails);
    
    // Clear cart after successful payment
    clearCart();
    
    // Navigate to success page dengan data
    navigate("/payment-success", {
      state: {
        orderId,
        paymentMethod,
        totalAmount: finalTotal
      }
    });
  };

  // Helper function untuk mendapatkan harga tambahan
  const getExtraPrice = (item) => {
    const portionExtra = sizePrice[item.portion] || 0;
    const spicyExtra = spicyPrice[item.spicy] || 0;
    const iceExtra = icePrice[item.ice] || 0;
    return portionExtra + spicyExtra + iceExtra;
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="payment-page">
        <h2>Keranjang Kosong</h2>
        <button onClick={() => navigate("/menu")}>Kembali ke Menu</button>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2>Halaman Pembayaran</h2>
      <div className="payment-container">
        <div className="order-summary">
          <h3>Ringkasan Pesanan</h3>
          {cartItems.map((item) => {
            const extraPrice = getExtraPrice(item);
            const portionExtra = sizePrice[item.portion] || 0;
            const spicyExtra = spicyPrice[item.spicy] || 0;
            const iceExtra = icePrice[item.ice] || 0;
            
            console.log("Rendering item:", item.name, "Total:", item.totalPrice);
            
            return (
              <div key={item.key} className="order-item">
                <div className="item-header">
                  <strong>{item.name}</strong>
                  <span>Qty: {item.quantity}</span>
                </div>
                
                <div className="item-details">
                  {item.portion && (
                    <small>
                      • Porsi: {item.portion}
                      {portionExtra > 0 && ` (+Rp. ${portionExtra.toLocaleString("id-ID")})`}
                    </small>
                  )}
                  {item.spicy && (
                    <small>
                      • Level Pedas: {item.spicy}
                      {spicyExtra > 0 && ` (+Rp. ${spicyExtra.toLocaleString("id-ID")})`}
                    </small>
                  )}
                  {item.ice && (
                    <small>
                      • Es: {item.ice}
                      {iceExtra > 0 && ` (+Rp. ${iceExtra.toLocaleString("id-ID")})`}
                    </small>
                  )}
                </div>

                {item.toppings?.length > 0 && (
                  <div className="item-toppings">
                    <small><strong>Topping:</strong> {item.toppings.join(", ")}</small>
                    <small className="topping-price">
                      (+Rp. {(item.toppingPrice || 0).toLocaleString("id-ID")})
                    </small>
                  </div>
                )}

                <div className="item-pricing">
                  <small>
                    Harga dasar: Rp. {item.unitPrice.toLocaleString("id-ID")}
                    {extraPrice > 0 && (
                      <>
                        <br />
                        Tambahan opsi: Rp. {extraPrice.toLocaleString("id-ID")}
                      </>
                    )}
                    {item.toppingPrice > 0 && (
                      <>
                        <br />
                        Topping: Rp. {item.toppingPrice.toLocaleString("id-ID")}
                      </>
                    )}
                    <br />
                    Subtotal per item: Rp. {((item.unitPrice + extraPrice + (item.toppingPrice || 0))).toLocaleString("id-ID")}
                    <br />
                    Quantity: × {item.quantity}
                  </small>
                  <strong>Rp. {item.totalPrice.toLocaleString("id-ID")}</strong>
                </div>
              </div>
            );
          })}
          
          <div className="order-totals">
            <p>Subtotal: <span>Rp. {subtotal.toLocaleString("id-ID")}</span></p>
            <p>Pajak (10%): <span>Rp. {tax.toLocaleString("id-ID")}</span></p>
            {shipping > 0 && (
              <p>Biaya Kirim: <span>Rp. {shipping.toLocaleString("id-ID")}</span></p>
            )}
            <hr />
            <p className="final-total">
              Total: <span>Rp. {finalTotal.toLocaleString("id-ID")}</span>
            </p>
          </div>
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

        <button className="confirm-btn" onClick={handlePaymentConfirmation}>
          Konfirmasi Pembayaran
        </button>
        <p className="secure-text">🔒 Pembayaran aman & terenkripsi</p>
      </div>
    </div>
  );
};

export default Payment;