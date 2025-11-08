import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";
import { IoBagHandle } from "react-icons/io5";
import {
  calculateTotal,
  drinkToppings,
  foodToppings,
  formatPrice as formatPriceUtil,
} from "../../logic/DetailOrder";
import { useCart } from "../../context/CartContext";
import "./detailorder.css";

const formatPrice = (price) => "Rp. " + formatPriceUtil(price || 0);

const DetailOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item || state || null;
  const { addToCart } = useCart();

  const [portion, setPortion] = useState("Small");
  const [spicy, setSpicy] = useState("Normal");
  const [ice, setIce] = useState("Normal Ice");
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const basePrice = item?.price || 75000;

  // Tentukan jenis topping (makanan/minuman)
  const toppingList = useMemo(
    () => (item?.category === "Food" ? foodToppings : drinkToppings),
    [item]
  );

  useEffect(() => {
    if (!item) navigate("/menu", { replace: true });
  }, [item, navigate]);

  const handleToppingChange = (name) => {
    setToppings((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };

  const total = useMemo(() => {
    return calculateTotal(basePrice, toppings, quantity, toppingList);
  }, [basePrice, toppings, quantity, toppingList]);

  const handleAddToCart = () => {
    if (!item) return;

    addToCart({
      item: {
        id: item.id,
        name: item.name,
        image: item.image || item.img,
        price: basePrice,
      },
      quantity,
      portion,
      spicy,
      ice,
      toppings,
    });

    navigate("/cart");
  };

  const handleOrderNow = () => {
    navigate("/payment", {
      state: { item, quantity, portion, spicy, ice, toppings },
    });
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
        <img src={item.image || item.img} alt={item.name} />
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

      {/* Options */}
      <section className="options-section">
        <div className="option-group">
          <h3>Size Options</h3>
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
            {["Normal", "Medium", "Hot"].map((level) => (
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

        {item?.category === "Drink" && (
          <div className="option-group">
            <h3>Ice Options</h3>
            <div className="option-buttons">
              {["Less Ice", "Normal Ice", "Extra Ice"].map((level) => (
                <button
                  key={level}
                  className={ice === level ? "active" : ""}
                  onClick={() => setIce(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Toppings */}
      <section className="topping-section">
        <h3>Tambah Topping</h3>
        <div className="topping-grid">
          {toppingList.map((topping) => (
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
          <h3>{formatPrice(total)}</h3>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="action-buttons">
        <button className="add-cart-btn" onClick={handleAddToCart}>
          <BsFillBasket2Fill className="icon-large" /> Tambah Keranjang
        </button>
        <button className="order-now-btn" onClick={handleOrderNow}>
          <IoBagHandle className="icon-large" /> Pesan Sekarang
        </button>
      </section>
    </div>
  );
};

export default DetailOrder;
