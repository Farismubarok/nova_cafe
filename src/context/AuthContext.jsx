// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // state will be initialized synchronously from localStorage below

  // Initialize from localStorage synchronously so pages don't redirect on refresh
  const [initializedUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (e) {
      return null;
    }
  });

  const [initializedHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('loginHistory')) || [];
    } catch (e) {
      return [];
    }
  });

  // Set initial states using the synchronous values
  const [userState, setUserState] = useState(initializedUser);
  const [historyState, setHistoryState] = useState(initializedHistory);

  // Replace variables to use the initialized state names
  // (keep `user` and `setUser` names for compatibility)
  const user = userState;
  const setUser = setUserState;
  const loginHistory = historyState;
  const setLoginHistory = setHistoryState;

  const login = (userData) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));

  const newHistory = [
    ...loginHistory,
    { user: userData.email, time: new Date().toLocaleString() },
  ];
  setLoginHistory(newHistory);
  localStorage.setItem("loginHistory", JSON.stringify(newHistory));
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Tambahkan ini 👇
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loginHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
