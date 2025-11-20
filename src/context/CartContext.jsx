import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

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
  const { user } = useAuth();
  const API_BASE = "http://localhost:5000";

  // Load cart from backend when user logs in
  useEffect(() => {
    const load = async () => {
      // Clear current cart immediately when user changes to avoid showing previous user's items
      setCartItems([]);

      if (user && user.id) {
        try {
          const res = await fetch(`${API_BASE}/cart/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setCartItems(data);
            return;
          }
          console.warn('Failed to load cart from server', res.status);
          // ensure we don't keep stale items if server returned error
          setCartItems([]);
        } catch (err) {
          console.error('Error loading cart from server', err);
          setCartItems([]);
        }
      }
      // fallback: keep whatever is local (do not clear)
    };

    load();
  }, [user]);

  const addToCart = async (cartData) => {
    const { item, quantity, toppings, notes, totalPrice, ...selectedOptions } = cartData;
    const cartItem = {
      // key will be replaced by DB id when persisted
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

    // If user logged in, persist to backend
    if (user && user.id) {
      try {
        const res = await fetch(`${API_BASE}/cart`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id, item: cartItem })
        });
        if (res.ok) {
          const body = await res.json();
          // Replace local key with DB id
          const persisted = { ...cartItem, key: body.cart_item_id };
          setCartItems(prev => [...prev, persisted]);
          return;
        } else {
          console.error('Failed to save cart item', await res.text());
        }
      } catch (err) {
        console.error('Error saving cart item', err);
      }
    }

    // fallback local only
    setCartItems((prev) => [...prev, cartItem]);
  };

  const removeFromCart = async (key) => {
    // If key is numeric (DB id), call backend
    if (user && user.id && typeof key === 'number') {
      try {
        const res = await fetch(`${API_BASE}/cart/${key}`, { method: 'DELETE' });
        if (res.ok) {
          setCartItems(prev => prev.filter(i => i.key !== key));
          return;
        } else {
          console.error('Failed to remove cart item', await res.text());
        }
      } catch (err) {
        console.error('Error removing cart item', err);
      }
    }

    // fallback: local
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = async () => {
    if (user && user.id) {
      try {
        const res = await fetch(`${API_BASE}/cart/user/${user.id}`, { method: 'DELETE' });
        if (res.ok) {
          setCartItems([]);
          return;
        }
        console.error('Failed to clear cart on server', await res.text());
      } catch (err) {
        console.error('Error clearing cart on server', err);
      }
    }
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
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
