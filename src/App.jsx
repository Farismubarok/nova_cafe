// src/App.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // import, jangan definisi ulang

// pages
import AdminDashboard from "./pages/Admin/admin.jsx";
import Home from "./pages/Home/home.jsx";
import AboutUs from "./pages/AboutUs/about-us.jsx";
import Menu from "./pages/Menu/menu.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Cart from "./pages/Cart/cart.jsx";
import Login from "./pages/Login/login.jsx";
import Payment from "./pages/Payment/payment.jsx";
import DetailOrder from "./pages/DetailOrder/detail-order.jsx";
import UserProfile from "./pages/Profile/userprofile.jsx";

import CartPage from "./pages/Cart/cart.jsx";

import Customers from "./pages/Custumer/custumer.jsx";
import Transaksi from "./pages/Transaksi/transactions.jsx";


function LayoutWrapper() {
  const location = window.location; // keep simple if not using useLocation here in this file


  const pathname = location.pathname;
  const hideLayout = pathname === "/userprofile";
  const hideLayoutAdmin = pathname === "/admin";
  // Jika path /userprofile, maka sembunyikan Navbar & Footer
  const hideLayout = location.pathname === "/userprofile";
  const hideLayoutAdmin = location.pathname === "/admin";
  const hideLayoutCustomers = location.pathname === "/customers";
  const hideLayoutTransaksi = location.pathname === "/transactions";


  return (
    <div className="app">
      {!hideLayout && !hideLayoutAdmin && !hideLayoutCustomers && !hideLayoutTransaksi && <Navbar />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/detail-order" element={<DetailOrder />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transaksi />} />
          {/* <Route path="/loginhistory" element={<LoginHistory />} /> */}

        </Routes>
      </main>

      {!hideLayout && !hideLayoutAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <LayoutWrapper />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
