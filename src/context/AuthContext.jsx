// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
    if (storedUser) setUser(storedUser);
    setLoginHistory(storedHistory);
  }, []);

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
