// src/context/FavoriteContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

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
        items: action.payload.items || []
      };
    case "CLEAR_FAVORITES":
      return initialState;
    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("nova_cafe_favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        console.log("Loading favorites from localStorage:", parsedFavorites);
        dispatch({ type: "LOAD_FAVORITES", payload: parsedFavorites });
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        localStorage.removeItem("nova_cafe_favorites");
      }
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    console.log("Saving favorites to localStorage:", state);
    localStorage.setItem("nova_cafe_favorites", JSON.stringify(state));
  }, [state]);

  const addToFavorite = (item) => {
    console.log("addToFavorite called with:", item);
    dispatch({ type: "ADD_FAVORITE", payload: item });
  };

  const removeFromFavorite = (id) => {
    console.log("removeFromFavorite called with id:", id);
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
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