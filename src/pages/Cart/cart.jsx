import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
// import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Keranjang Belanja Anda Kosong 😢</h2>
        <button className="checkout-btn" onClick={() => navigate("/")}>
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Keranjang Belanja Anda</h2>

      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-card" key={index}>
            <img src={item.img} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
            </div>
            <div className="cart-price">
              <p>Rp. {item.price.toLocaleString("id-ID")}</p>
              <button onClick={() => removeFromCart(item.name)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-info">
          <div className="left">
            <p>Jumlah</p>
            <h4>{cartItems.length}</h4>
          </div>
          <div className="right">
            <p>Total Harga</p>
            <h4>Rp. {getTotal().toLocaleString("id-ID")}</h4>
          </div>
        </div>
        <button
          className="checkout-btn"
          onClick={() =>
            navigate("/payment", { state: { total: getTotal(), items: cartItems } })
          }
        >
          Lanjut Pembayaran
        </button>
      </div>
    </div>
  );
};

export default CartPage;
