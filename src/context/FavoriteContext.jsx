// src/context/FavoriteContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const FavoriteContext = createContext();

const initialState = {
  items: []
};

function favoriteReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE": {
      // Cek apakah item sudah ada di favorit
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        console.log("Item already in favorites");
        return state;
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case "REMOVE_FAVORITE":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case "LOAD_FAVORITES":
      return {
        ...state,
        items: action.payload || []
      };
    case "CLEAR_FAVORITES":
      return initialState;
    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);
  const { user } = useAuth();
  const API_BASE = "http://localhost:5000";

  // Load favorites from backend when mounted and when user changes
  useEffect(() => {
    const load = async () => {
      const userId = user?.id;
      
      if (userId) {
        try {
          console.log("Loading favorites for user:", userId);
          const res = await fetch(`${API_BASE}/favorites/${userId}`);
          
          if (res.ok) {
            const data = await res.json();
            console.log("Loaded favorites from server:", data);
            dispatch({ type: "LOAD_FAVORITES", payload: data });
          } else {
            console.warn("Failed to load favorites from server", res.status);
          }
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      } else {
        dispatch({ type: "CLEAR_FAVORITES" });
      }
    };

    // Load favorites when component mounts and when user changes
    load();
  }, [user]);

  // Save to localStorage when favorites change
  useEffect(() => {
    console.log("Saving favorites to localStorage:", state);
    localStorage.setItem("nova_cafe_favorites", JSON.stringify(state));
  }, [state]);

  const addToFavorite = async (item) => {
    console.log("addToFavorite called with:", item);
    
    if (!user?.id) {
      console.warn("Cannot add favorite: user not logged in");
      return;
    }

    try {
      console.log("Sending add favorite request:", {
        user_id: user.id,
        menu_id: item.id
      });

      const res = await fetch(`${API_BASE}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          menu_id: item.id
        })
      });

      console.log("Add favorite response:", res.status);
      if (res.ok) {
        const result = await res.json();
        console.log("Add favorite result:", result);
        dispatch({ type: "ADD_FAVORITE", payload: item });
      } else {
        const errorText = await res.text();
        console.error("Failed to add favorite on server", errorText);
      }
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFromFavorite = async (id) => {
    console.log("removeFromFavorite called with id:", id);
    
    if (!user?.id) {
      console.warn("Cannot remove favorite: user not logged in");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/favorites/${user.id}/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        dispatch({ type: "REMOVE_FAVORITE", payload: id });
      } else {
        console.error("Failed to remove favorite on server", await res.text());
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };
  
  const clearFavorites = () => dispatch({ type: "CLEAR_FAVORITES" });
  
  const isFavorite = (id) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <FavoriteContext.Provider value={{
      favoriteItems: state.items,
      addToFavorite,
      removeFromFavorite,
      clearFavorites,
      isFavorite
    }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => useContext(FavoriteContext);