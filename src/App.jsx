// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import LoginHistory from "./components/LoginHistory.jsx"; // ✅ sesuaikan dengan nama file kamu (huruf kecil)

// Context
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home/home.jsx";
import AboutUs from "./pages/AboutUs/about-us.jsx";
import Menu from "./pages/Menu/menu.jsx";
import Contact from "./pages/Contact/contact.jsx";
import Cart from "./pages/Cart/cart.jsx";
import Login from "./pages/Login/login.jsx";
import Payment from "./pages/Payment/payment.jsx";
import DetailOrder from "./pages/DetailOrder/detail-order.jsx";
import UserProfile from "./pages/Profile/userprofile.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />

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
              {/* <Route path="/loginhistory" element={<LoginHistory />} /> ✅ Route untuk riwayat login */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
