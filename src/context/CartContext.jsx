import React, { createContext, useContext, useState } from "react";


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Tambah item ke keranjang
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Hapus item dari keranjang
  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((i) => i.name !== name));
  };

  // Hitung total
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
