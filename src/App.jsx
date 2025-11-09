// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// pages
import AdminDashboard from "./pages/Admin/admin.jsx";
import Home from "./pages/Home/home.jsx";
import AboutUs from "./pages/AboutUs/about-us.jsx";
import Menu from "./pages/Menu/menu.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Cart from "./pages/Cart/cart.jsx";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import Payment from "./pages/Payment/payment.jsx";
import DetailOrder from "./pages/DetailOrder/detail-order.jsx";
import UserProfile from "./pages/Profile/userprofile.jsx";

import Customers from "./pages/Custumer/custumer.jsx";
import Transaksi from "./pages/Transaksi/transactions.jsx";
import Management from "./pages/Management/management.jsx";

function LayoutWrapper() {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Halaman yang menyembunyikan Navbar & Footer
  const hideLayout = pathname === "/userprofile";
  const hideLayoutAdmin = pathname === "/admin";
  const hideLayoutCustomers = pathname === "/customers";
  const hideLayoutTransaksi = pathname === "/transactions";
  const hideLayoutManagement = pathname === "/management";

  return (
    <div className="app">
      {/* Navbar */}
      {!hideLayout &&
        !hideLayoutAdmin &&
        !hideLayoutCustomers &&
        !hideLayoutTransaksi &&
        !hideLayoutManagement && <Navbar />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/detail-order" element={<DetailOrder />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transaksi />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </main>

      {/* Footer */}
      {!hideLayout &&
        !hideLayoutAdmin &&
        !hideLayoutCustomers &&
        !hideLayoutTransaksi &&
        !hideLayoutManagement && <Footer />}
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