// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  // Jika belum login → kembalikan ke beranda
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika role user tidak cocok → juga ke beranda
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Jika lolos, tampilkan elemen aslinya
  return element;
};

export default PrivateRoute;