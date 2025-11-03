import React from "react";
import "./userprofile.css";
// import { FaClock, FaHeart, FaSignOutAlt, FaArrowLeft, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function UserProfile() {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">☕ Nova Cafe</h2>
        <hr />
        <div className="menu">
          <button className="menu-item back">
            <FaArrowLeft /> Back to menu
          </button>
          <button className="menu-item">
            <FaClock /> Riwayat Pesanan
          </button>
          <button className="menu-item">
            <FaHeart /> Transaksi
          </button>
        </div>
        <div className="logout">
          <FaSignOutAlt /> Log Out
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <img
            src="https://via.placeholder.com/60"
            alt="User avatar"
            className="avatar"
          />
          <h1>User profile</h1>
        </header>

        <section className="profile-card">
          <h3>Informasi Pribadi</h3>

          <div className="info-box">
            <FaUserIcon />
            <div>
              <p className="label">Nama Lengkap</p>
              <p>Andi Pratama</p>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="icon" />
            <div>
              <p className="label">Email</p>
              <p>andi.pratama@email.com</p>
            </div>
          </div>

          <div className="info-box">
            <FaPhone className="icon" />
            <div>
              <p className="label">Nomor Telepon</p>
              <p>+62 812-3456-7890</p>
            </div>
          </div>

          <div className="info-box">
            <FaCalendarAlt className="icon" />
            <div>
              <p className="label">Tanggal Lahir</p>
              <p>15 Maret 1995</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Icon for user (karena react-icons tidak punya FaUser bawaan di versi terbaru)
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
      d="M8 9a5 5 0 0 0-5 5v.5h10V14a5 5 0 0 0-5-5z"
    />
  </svg>
);
