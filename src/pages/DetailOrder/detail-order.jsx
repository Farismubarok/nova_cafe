import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { calculateTotal, drinkToppings, foodToppings, formatPrice as formatPriceUtil } from "../../logic/DetailOrder";
import { useCart } from "../../context/CartContext"; // <-- gunakan context terpusat
import "./detailorder.css";

const formatPrice = (price) => formatPriceUtil(price || 0);

export const MenuCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const openDetail = () => navigate("/detail-order", { state: item });

  const handleAddCart = () => {
    addToCart({ item, quantity: 1, portion: "Small", spicy: "Normal", toppings: [] });
  };

  return (
    <div className="menu-card">
      <img src={item.image || item.img} alt={item.name} onClick={openDetail} style={{ cursor: "pointer" }} />
      <div className="menu-body">
        <h4>{item.name}</h4>
        <p>{`Rp. ${Number(item.price || 0).toLocaleString("id-ID")}`}</p>
        <div className="menu-actions">
          <button onClick={openDetail}>Detail</button>
          <button onClick={handleAddCart}>Tambah Keranjang</button>
        </div>
      </div>
    </div>
  );
};

const DetailOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state || null;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState("Small");
  const [spicy, setSpicy] = useState("Normal");
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    if (!item) navigate("/menu", { replace: true });
  }, [item, navigate]);

  const toppingList = useMemo(() => (item?.category === "Food" ? foodToppings : drinkToppings), [item]);

  const toggleTopping = (name) => setToppings((prev) => (prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]));

  const total = useMemo(() => {
    if (!item) return 0;
    return calculateTotal(item.price || 0, toppings, quantity, toppingList);
  }, [item, toppings, quantity, toppingList]);

  const handleAddToCart = () => {
    if (!item) return;
    
    console.log("Adding item:", {
      item,
      quantity,
      portion,
      spicy,
      toppings
    });

    addToCart({
      item: {
        id: item.id,
        name: item.name,
        image: item.image || item.img,
        price: item.price
      },
      quantity,
      portion,
      spicy,
      toppings
    });
    
    navigate("/cart");
  };

  if (!item) return null;

  return (
    <div className="detail-page">
      <div className="detail-header">
        <h2>{item.name}</h2>
        <p>{`Rp. ${Number(item.price || 0).toLocaleString("id-ID")}`}</p>
      </div>
      <div className="detail-body">
        <img src={item.image || item.img} alt={item.name} />
        <div className="detail-actions">
          <button onClick={handleAddToCart}>Tambah Keranjang</button>
          <button onClick={() => navigate("/cart")} className="go-cart-btn">Lihat Keranjang</button>
        </div>
      </div>
      <div className="detail-actions">
        <p className="total">Total: {formatPrice(total)}</p>
        <button onClick={handleAddToCart} className="add-cart-btn">Tambah Keranjang</button>
        <button onClick={() => navigate("/cart")} className="go-cart-btn">Lihat Keranjang</button>
      </div>
    </div>
  );
};

export default DetailOrder;
