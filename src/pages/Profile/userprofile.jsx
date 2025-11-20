import React from "react";
import { FaClock, FaHeart, FaSignOutAlt, FaArrowLeft, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 💡 Import useAuth
import logo from "../../assets/logo.svg";
import "./userprofile.css";

// Icon user custom (tetap sama)
const FaUserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="icon"
    viewBox="0 0 16 16"
  >
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path
      fillRule="evenodd"
      d="M8 9a5 5 0 0 0-5 5v.5h10V14a5 5 0 0 0-5-5z"/>
  </svg>
);


export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 💡 Ambil data user dan fungsi logout

  if (!user) {
    // Pengguna belum login, arahkan kembali ke login/home
    return (
        <div style={{padding: '50px', textAlign: 'center'}}>
            <p>Anda harus login untuk mengakses halaman ini.</p>
            <button onClick={() => navigate('/login')}>Login Sekarang</button>
        </div>
    );
  }

  return (
    <div className="container-profile">
      <header className="header">
        <h1>User profile</h1>
          <img
            src="https://via.placeholder.com/60" // Ganti dengan user.avatar jika ada
            alt="User avatar"
            className="avatar"
          />
        </header>

      {/* Sidebar */}
      <aside className="sidebar">
       <div className="logo-profile">
          <img src={logo} alt="Nova Cafe"/>
          <h1>Nova Cafe</h1>
        </div>
        <hr />
        <div className="menu">
          <button className="menu-item back" onClick={() => navigate("/menu")}>
            <FaArrowLeft /> Back to menu
          </button>
          <button className="menu-item">
            <FaClock /> Riwayat Pesanan
          </button>
          <button className="menu-item">
            <FaHeart /> Transaksi
          </button>
        </div>
        <div className="logout" onClick={logout}> {/* 💡 Gunakan fungsi logout dari Context */}
          <FaSignOutAlt /> Log Out
        </div>
      </aside>

        

      {/* Main Content */}
      <main className="content">

        <section className="profile-card">
          <h3>Informasi Pribadi</h3>

          <div className="info-box">
            <FaUserIcon />
            <div>
              <p className="label">Nama Lengkap</p>
              <p>{user.name}</p> {/* 💡 Data dari Context */}
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <p className="label">Email</p>
              <p>{user.email}</p> {/* 💡 Data dari Context */}
            </div>
          </div>

          <div className="info-box">
            <FaPhone className="icon" />
            <div>
              <p className="label">Nomor Telepon</p>
              <p>{user.phone || '—'}</p> {/* 💡 Data dari Context */}
            </div>
          </div>

          <div className="info-box">
            <FaCalendarAlt className="icon" />
            <div>
              <p className="label">Tanggal Lahir</p>
              <p>15 Maret 1995</p> {/* Tetap hardcoded jika tidak ada di DB */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}