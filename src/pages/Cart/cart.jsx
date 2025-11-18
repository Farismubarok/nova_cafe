import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./cart.css";

const CartPage = () => {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  console.log("Cart items:", cartItems); // Debug log
  
  // Debug setiap item
  cartItems.forEach((item, index) => {
    console.log(`Item ${index} notes:`, item.notes);
  });

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Keranjang Belanja Anda Kosong</h2>
        <button className="checkout-btn" onClick={() => navigate("/menu")}>
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Keranjang Belanja Anda</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-card" key={item.key}>
            <img src={item.img} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <p>Porsi: {item.portion}</p>
              
              {/* Tampilkan ice jika ada */}
              {item.ice && <p>Es: {item.ice}</p>}
              
              {/* Tampilkan toppings jika ada */}
              {item.toppings?.length > 0 && (
                <p>Toppings: {item.toppings.join(", ")}</p>
              )}
              
              {/* Tampilkan catatan jika ada */}
              {item.notes && item.notes.trim() !== "" && (
                <p className="cart-notes">
                  <strong>Catatan:</strong> {item.notes}
                </p>
              )}
            </div>
            <div className="cart-price">
              <p>Rp. {item.totalPrice.toLocaleString("id-ID")}</p>
              <button onClick={() => removeFromCart(item.key)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-info">
          <p>Total Harga</p>
          <h4>Rp. {getTotal().toLocaleString("id-ID")}</h4>
        </div>
        
        <div className="cart-actions">
          <button 
            className="checkout-btn"
            onClick={() => {
              console.log("Navigating to payment with items:", cartItems);
              console.log("Total:", getTotal());
              navigate("/payment");
            }}
          >
            Lanjut Pembayaran
          </button>
          <button className="clear-btn" onClick={clearCart}>
            Kosongkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;