import React, { useEffect, useState } from "react";
import "./transactions.css";
import { FaClock, FaHeart, FaSignOutAlt, FaArrowLeft, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Users, Coffee, CreditCard } from "lucide-react";
import profileImg from "../../assets/icon/jmk.svg";
import logo from "../../assets/logo.svg";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil data dari backend
  useEffect(() => {
    fetch("http://localhost:5000/orders") // Ganti sesuai endpoint backend kamu
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar-admin">
             <div className="logo-admin">
                <img src={logo} alt="Nova Cafe"/>
                <h1>Nova Cafe</h1>
              </div>
              <hr />
              <div className="menu-admin">
                <button className="menu-item back" onClick={() => navigate("/admin")}>
                  <FaArrowLeft /> Dashboard
                </button>
                <button className="menu-item" onClick={() => navigate("/customers")}>
                  <FaClock /> Customers
                </button>
                <button className="menu-item" onClick={() => navigate("/transaksi")}>
                  <FaHeart /> Transactions
                </button>
              </div>
              <div className="menu-management" onClick={() => navigate("/menu-management")}>
                <FaSignOutAlt /> Menu Management
              </div>
            </aside>

      {/* Main Section */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div></div>
          <div className="profile">
            <img src={profileImg} alt="Admin" />
            <span>Nova Admin</span>
          </div>
        </header>

        {/* Recent Orders */}
        <section className="recent-orders">
          <h3>Recent Order</h3>
          {loading ? (
            <p className="loading-text">Memuat data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Customer ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_id}</td>
                      <td>{order.customer}</td>
                      <td>{order.customer_id}</td>
                      <td>
                        Rp. {Number(order.total).toLocaleString("id-ID")}
                      </td>
                      <td
                        className={
                          order.status === "Proses"
                            ? "status-pending"
                            : "status-paid"
                        }
                      >
                        {order.status}
                      </td>
                      <td>{order.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-text">
                      Tidak ada data order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default Transactions;
