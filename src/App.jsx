// farismubarok/nova_cafe/nova_cafe-4d2ccefa63e47d20beda087353411fe508f880b0/src/App.jsx

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
import PaymentSuccess from "./pages/Popup/PaymentSuccess.jsx"; // ← PERBAIKAN
import DetailOrder from "./pages/DetailOrder/detail-order.jsx";
import UserProfile from "./pages/Profile/userprofile.jsx";
import HistoryPage from "./pages/History/history.jsx"; // Tambahkan import HistoryPage
// 💡 Import PrivateRoute
import PrivateRoute from "./context/PrivateRoute.jsx";

import Customers from "./pages/Custumer/custumer.jsx";
import Transaksi from "./pages/Transaksi/transactions.jsx";
import Management from "./pages/Management/management.jsx";
// import HistoryPage from "./pages/History/history.jsx"; // Sudah dipindahkan ke atas

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
          {/* Page Publik */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* page yang butuh login */}
          <Route
            path="/detail-order"
            element={
              <PrivateRoute>
                <DetailOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <HistoryPage />
              </PrivateRoute>
            }
          />
          
          {/* Rute Admin */}
          {/* Catatan: Untuk Admin seharusnya menggunakan AdminRoute, tapi di sini hanya rute biasa */}
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