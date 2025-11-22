// src/pages/Profile/userprofile.jsx

import React, { useState, useEffect } from "react";
import { FaClock, FaHeart, FaSignOutAlt, FaArrowLeft, FaPhone, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";
import "./userprofile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // State Form Data (Tambahkan birthDate)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "", // Default kosong
  });

  // Helper: Format Tanggal untuk Input (YYYY-MM-DD)
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  // Helper: Format Tanggal untuk Tampilan (dd MMMM yyyy)
  const formatDateForDisplay = (isoDate) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Isi form saat user dimuat
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        // Pastikan format tanggal cocok untuk input date
        birthDate: user.birthDate ? formatDateForInput(user.birthDate) : "", 
      });
    }
  }, [user]);

  if (!user) {
    return (
        <div style={{padding: '50px', textAlign: 'center'}}>
            <p>Anda harus login untuk mengakses halaman ini.</p>
            <button onClick={() => navigate('/login')} className="btn-login-redirect">Login Sekarang</button>
        </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
        const response = await fetch(`http://localhost:5000/api/users/profile/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                birthDate: formData.birthDate // Kirim tanggal lahir ke backend
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Update Context
            login({
                ...user,
                name: formData.name,
                phone: formData.phone,
                birthDate: formData.birthDate // Update tanggal di local storage
            });

            setMsg({ type: 'success', text: 'Profil berhasil diperbarui!' });
            setIsEditing(false);
        } else {
            setMsg({ type: 'error', text: data.message || 'Gagal update profil' });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        setMsg({ type: 'error', text: 'Terjadi kesalahan koneksi' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="container-profile">
      <header className="header">
        <div className="header-content">
            <h1>User Profile</h1>
            <div className="user-mini-info">
                <span>{user.name}</span>
                <img
                    src="https://via.placeholder.com/60"
                    alt="User avatar"
                    className="avatar"
                />
            </div>
        </div>
      </header>

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
          <button className="menu-item" onClick={() => navigate("/history")}>
            <FaClock /> Riwayat Pesanan
          </button>
          <button className="menu-item">
            <FaHeart /> Item Favorit
          </button>
        </div>
        <div className="logout" onClick={logout}>
          <FaSignOutAlt /> Log Out
        </div>
      </aside>

      <main className="content">
        <section className="profile-card">
          <div className="card-header">
            <h3>Informasi Pribadi</h3>
            {!isEditing ? (
                <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                    <FaEdit /> Edit
                </button>
            ) : (
                <div className="edit-actions">
                    <button className="btn-cancel" onClick={() => setIsEditing(false)} disabled={loading}>
                        <FaTimes /> Batal
                    </button>
                    <button className="btn-save" onClick={handleSave} disabled={loading}>
                        {loading ? 'Menyimpan...' : <><FaSave /> Simpan</>}
                    </button>
                </div>
            )}
          </div>

          {msg.text && (
            <div className={`alert ${msg.type}`}>
                {msg.text}
            </div>
          )}

          <div className="info-list">
            {/* NAMA */}
            <div className="info-box">
                <div className="icon-wrapper"><FaUser /></div>
                <div className="info-content">
                <p className="label">Nama Lengkap</p>
                {isEditing ? (
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="profile-input"
                    />
                ) : (
                    <p className="value">{user.name}</p>
                )}
                </div>
            </div>

            {/* EMAIL (Read Only) */}
            <div className="info-box">
                <div className="icon-wrapper"><FaEnvelope /></div>
                <div className="info-content">
                <p className="label">Email</p>
                <p className="value disabled">{user.email}</p>
                </div>
            </div>

            {/* NO HP */}
            <div className="info-box">
                <div className="icon-wrapper"><FaPhone /></div>
                <div className="info-content">
                <p className="label">Nomor Telepon</p>
                {isEditing ? (
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="profile-input"
                        placeholder="Contoh: 08123456789"
                    />
                ) : (
                    <p className="value">{user.phone || '-'}</p>
                )}
                </div>
            </div>

            {/* TANGGAL LAHIR (Dynamic) */}
            <div className="info-box">
                <div className="icon-wrapper"><FaCalendarAlt /></div>
                <div className="info-content">
                <p className="label">Tanggal Lahir</p>
                {isEditing ? (
                    <input 
                        type="date" 
                        name="birthDate" 
                        value={formData.birthDate} 
                        onChange={handleChange} 
                        className="profile-input"
                    />
                ) : (
                    <p className="value">
                        {formData.birthDate ? formatDateForDisplay(formData.birthDate) : "Belum diatur"}
                    </p>
                )}
                </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}