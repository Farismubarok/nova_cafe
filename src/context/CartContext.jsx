import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

// ... existing useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (cartData) => {
    const { item, quantity, toppings, notes, totalPrice, ...selectedOptions } = cartData;
    const cartItem = {
      key: Date.now() + Math.random(),
      id: item.id,
      name: item.name,
      img: item.image || item.img,
      price: item.price,
      quantity,
      ...selectedOptions,
      toppings,
      notes: notes || "",
      totalPrice, 
    };

    console.log("Adding to cart:", cartItem);
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
