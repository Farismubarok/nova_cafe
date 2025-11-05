
// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const p = action.payload;
      const itemToAdd = {
        key: Date.now().toString(), // unique key
        id: p.item.id,
        name: p.item.name,
        img: p.item.image || p.item.img,
        quantity: p.quantity || 1,
        portion: p.portion || "Small",
        spicy: p.spicy || "Normal",
        unitPrice: p.item.price,
        totalPrice: p.item.price * (p.quantity || 1),
        toppings: p.toppings || []
      };
      
      return {
        ...state,
        items: [...state.items, itemToAdd]
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.key !== action.payload)
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("nova_cafe_cart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("nova_cafe_cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (payload) => {
    console.log("Adding to cart:", payload); // Debug log
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeFromCart = (key) => dispatch({ type: "REMOVE_ITEM", payload: key });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const getTotal = () => state.items.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
