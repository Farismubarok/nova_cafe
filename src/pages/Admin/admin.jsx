import React, { useEffect, useState } from "react";
import "./admin.css";
import { Users, Coffee, CreditCard } from "lucide-react";
import profileImg from "../../assets/image/profile.jpg";
import logo from "../../assets/image/logo.svg";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <aside className="sidebar">
        <div className="logo">
          <img src={logo} alt="Nova Cafe Logo" />
          <h2>Nova Cafe</h2>
        </div>

        <nav className="menu">
          <a href="#" className="active">
            <Users size={20} /> Dashboard
          </a>
          <a href="#">
            <Users size={20} /> Customer
          </a>
          <a href="#">
            <CreditCard size={20} /> Transaksi
          </a>
          <a href="#">
            <Coffee size={20} /> Menu Management
          </a>
        </nav>
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

        {/* Statistik */}
        <section className="stats-section">
          <div className="card">
            <Users size={28} color="#0A774A" />
            <div>
              <h3>5</h3>
              <p>Total Customer</p>
            </div>
          </div>

          <div className="card">
            <Coffee size={28} color="#0A774A" />
            <div>
              <h3>{orders.length}</h3>
              <p>Total Order</p>
            </div>
          </div>
        </section>

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

export default AdminDashboard;
