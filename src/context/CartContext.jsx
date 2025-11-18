import React, { createContext, useContext, useState } from "react";
import { calculateTotal, drinkToppings, foodToppings } from "../logic/DetailOrder";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = ({ item, quantity, portion, spicy, ice, toppings, notes }) => {
    const toppingList = item.category === "Food" ? foodToppings : drinkToppings;
    
    const totalPrice = calculateTotal(
      item.price,
      toppings,
      quantity,
      toppingList,
      portion,
      spicy,
      ice
    );

    const cartItem = {
      key: Date.now() + Math.random(), // unique key
      id: item.id,
      name: item.name,
      img: item.image || item.img,
      price: item.price,
      quantity,
      portion,
      spicy,
      ice,
      toppings,
      notes: notes || "", // Pastikan notes disimpan
      totalPrice,
    };

    console.log("Adding to cart:", cartItem); // Debug log

    setCartItems((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};