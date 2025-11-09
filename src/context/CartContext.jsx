// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: []
};

// Harga tambahan untuk ukuran - SINKRON dengan DetailOrderLogic.js
const sizePrice = {
  Small: 0,
  Medium: 5000,
  Large: 10000,
};

// Harga tambahan untuk level pedas - SINKRON dengan DetailOrderLogic.js
const spicyPrice = {
  Normal: 0,
  Medium: 5000,
  Hot: 10000,
};

// Harga tambahan untuk level es - SINKRON dengan DetailOrderLogic.js
const icePrice = {
  "Less Ice": 0,
  "Normal Ice": 0,
  "Extra Ice": 0,
};

// Fungsi untuk menghitung harga topping
// HARUS SAMA PERSIS dengan logic/DetailOrderLogic.js
const calculateToppingPrice = (toppings) => {
  if (!toppings || toppings.length === 0) return 0;
  
  // Daftar harga topping - SINKRON dengan DetailOrderLogic.js
  const toppingPrices = {
    // Drink toppings
    "Whipped Cream": 5000,
    "Extra Whipped Cream": 15000,
    "Caramel Drizzle": 5000,
    "Mocha Drizzle": 6000,
    "Caramel Syrup": 5000,
    "Vanilla Syrup": 5000,
    
    // Food toppings
    "Telur Ceplok": 5000,
    "Ayam": 15000,
    "Bakso": 5000,
    "Sosis": 6000,
    "Ati Ampela": 5000,
    "Seafood": 5000,
  };
  
  const total = toppings.reduce((sum, toppingName) => {
    const price = toppingPrices[toppingName] || 0;
    console.log(`[CartContext] Topping: ${toppingName}, Price: ${price}`);
    return sum + price;
  }, 0);
  
  console.log(`[CartContext] Total Topping Price: ${total}`);
  return total;
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const p = action.payload;
      
      console.log("=== ADD_ITEM to Cart ===");
      console.log("Payload:", p);
      console.log("Item Price:", p.item.price);
      console.log("Portion:", p.portion);
      console.log("Spicy:", p.spicy);
      console.log("Ice:", p.ice);
      console.log("Toppings:", p.toppings);
      console.log("Quantity:", p.quantity);
      
      // Hitung harga tambahan untuk size, spicy, dan ice
      const portionExtra = sizePrice[p.portion] || 0;
      const spicyExtra = spicyPrice[p.spicy] || 0;
      const iceExtra = icePrice[p.ice] || 0;
      const toppingPrice = calculateToppingPrice(p.toppings);
      
      // Total harga per unit = base + size + spicy/ice + topping
      const unitPriceTotal = p.item.price + portionExtra + spicyExtra + iceExtra + toppingPrice;
      
      // Total harga = unit price × quantity
      const totalPrice = unitPriceTotal * (p.quantity || 1);
      
      console.log("Base Price:", p.item.price);
      console.log("Portion Extra:", portionExtra);
      console.log("Spicy Extra:", spicyExtra);
      console.log("Ice Extra:", iceExtra);
      console.log("Topping Price:", toppingPrice);
      console.log("Unit Price Total:", unitPriceTotal);
      console.log("Total Price (× quantity):", totalPrice);
      console.log("======================");
      
      const itemToAdd = {
        key: Date.now().toString(), // unique key
        id: p.item.id,
        name: p.item.name,
        img: p.item.image || p.item.img,
        quantity: p.quantity || 1,
        portion: p.portion || "Small",
        spicy: p.spicy || "Normal",
        ice: p.ice || "Normal Ice",
        unitPrice: p.item.price,
        portionExtra: portionExtra,
        spicyExtra: spicyExtra,
        iceExtra: iceExtra,
        toppingPrice: toppingPrice,
        totalPrice: totalPrice,
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
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload.items || []
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nova_cafe_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Loading cart from localStorage:", parsedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem("nova_cafe_cart");
      }
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", state);
    localStorage.setItem("nova_cafe_cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (payload) => {
    console.log("addToCart called with:", payload);
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeFromCart = (key) => dispatch({ type: "REMOVE_ITEM", payload: key });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const getTotal = () => {
    const total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    console.log("Cart Total:", total);
    return total;
  };

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

export const useCart = () => useContext(CartContext);