import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./detailorder.css";


const DetailOrder = () => {
  const location = useLocation();
  const item = location.state; // Data dari MenuPage (name, price, img)

  const [portion, setPortion] = useState("Small");
  const [spicy, setSpicy] = useState("Small");
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const basePrice = item?.price || 75000;

  const toppingOptions = [
    { name: "Whipped Cream", price: 5000 },
    { name: "Extra Whipped Cream", price: 15000 },
    { name: "Caramel Drizzle", price: 5000 },
    { name: "Mocha Drizzle", price: 6000 },
    { name: "Caramel Syrup", price: 5000 },
    { name: "Vanilla Syrup", price: 5000 },
  ];

  const handleToppingChange = (name) => {
    setToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const calculateTotal = () => {
    const toppingTotal = toppings.reduce((sum, t) => {
      const toppingItem = toppingOptions.find((item) => item.name === t);
      return sum + (toppingItem ? toppingItem.price : 0);
    }, 0);
    return (basePrice + toppingTotal) * quantity;
  };

  const formatPrice = (price) => {
    return "Rp. " + price.toLocaleString("id-ID");
  };

  if (!item) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Tidak ada data produk</h2>
        <p>Silakan kembali ke halaman menu.</p>
      </div>
    );
  }

  return (
    <div className="detail-order-page">
      {/* Product Info */}
      <section className="order-header">
        <img src={item.img} alt={item.name} />
        <div className="order-info">
          <h2>{item.name}</h2>
          <p className="price">{formatPrice(basePrice)}</p>
          <p className="desc">
            Nikmati {item.name} khas kami dengan cita rasa gurih dan autentik.
            Dimasak dengan bahan pilihan berkualitas untuk rasa yang memanjakan.
          </p>
        </div>
      </section>

      <hr />

      {/* Portion & Spicy Options */}
      <section className="options-section">
        <div className="option-group">
          <h3>Porsi Options</h3>
          <div className="option-buttons">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                className={portion === size ? "active" : ""}
                onClick={() => setPortion(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <h3>Spicy Options</h3>
          <div className="option-buttons">
            {["Small", "Medium", "Large"].map((level) => (
              <button
                key={level}
                className={spicy === level ? "active" : ""}
                onClick={() => setSpicy(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Topping */}
      <section className="topping-section">
        <h3>Tambah Topping</h3>
        <div className="topping-grid">
          {toppingOptions.map((topping) => (
            <label key={topping.name} className="topping-item">
              <input
                type="checkbox"
                checked={toppings.includes(topping.name)}
                onChange={() => handleToppingChange(topping.name)}
              />
              {topping.name}
              <span>+ {formatPrice(topping.price)}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="notes-section">
        <h3>Catatan</h3>
        <textarea
          placeholder="Tulis catatan khusus untuk pesanan anda"
          rows={3}
        ></textarea>
      </section>

      {/* Quantity & Total */}
      <section className="summary-section">
        <div className="quantity-box">
          <p>Jumlah</p>
          <div className="quantity-controls">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="total-box">
          <p>Total Harga</p>
          <h3>{formatPrice(calculateTotal())}</h3>
        </div>
      </section>

      {/* Buttons */}
      <section className="action-buttons">
        <button className="add-cart-btn">Tambah Keranjang</button>
        <button className="order-now-btn">Pesan Sekarang</button>
      </section>
    </div>
  );
};

export default DetailOrder;
