import React, { useEffect, useState } from "react";
import "./custumer.css";
import {
  FaCreditCard,
  FaTrashAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import profileImg from "../../assets/icon/jmk.svg";
import { IoPersonSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { PiCoffeeFill } from "react-icons/pi";



const Customers = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil data dari backend
  useEffect(() => {
    fetch("http://localhost:5000/orders")
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

  // Fungsi hapus data
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm(
      "Apakah kamu yakin ingin menghapus data customer ini?"
    );
    if (!konfirmasi) return;

    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order.id !== id));
        alert("Data berhasil dihapus!");
      } else {
        alert("Gagal menghapus data!");
      }
    } catch (error) {
      console.error("Error saat menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar-admin">
        <div className="logo-admin">
          <img src={logo} alt="Nova Cafe" />
          <h1>Nova Cafe</h1>
        </div>
        <hr />
        <div className="menu-admin">
          <button className="menu-item back" onClick={() => navigate("/admin")}>
            <RxDashboard /> Dashboard
          </button>
          <button className="menu-item" onClick={() => navigate("/customers")}>
            <IoPersonSharp /> Customers
          </button>
          <button
            className="menu-item"onClick={() => navigate("/transactions")}>
            <FaCreditCard /> Transactions
          </button>
          <button
            className="menu-item"onClick={() => navigate("/management")}>
            <PiCoffeeFill /> Menu Management
          </button>
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

        {/* Customer List */}
        <section className="recent-orders">
          <h3>Customer List</h3>
          {loading ? (
            <p className="loading-text">Memuat data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID Pesanan</th>
                  <th>Customer</th>
                  <th>Customer ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_id}</td>
                      <td>{order.customer}</td>
                      <td>{order.customer_id}</td>
                      <td>Rp. {Number(order.total).toLocaleString("id-ID")}</td>
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
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(order.id)}
                        >
                          <FaTrashAlt /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-text">
                      Tidak ada data Customers
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

export default Customers;
