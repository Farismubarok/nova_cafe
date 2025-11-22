import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import "./register.css"; 
import logo from "../../assets/logo.jpg";

const Register = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm || !phoneNumber) {
      setError("Semua field wajib diisi");
      setSuccess("");
      return;
    }

    if (password !== confirm) {
      setError("Password dan konfirmasi tidak cocok");
      setSuccess("");
      return;
    }

    try {
      // Register via API
      await authService.register({
        name,
        email,
        password,
        phone: phoneNumber
      });

      setSuccess("Akun berhasil dibuat! Anda akan diarahkan ke halaman login...");
      setError("");

      // Arahkan ke halaman login setelah 2 detik
      setTimeout(() => navigate("/login", { state: { isLogin: true } }), 2000);

    } catch (err) {
      setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
      setSuccess("");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <img src={logo} alt="Nova Cafe" className="login-logo" />
      </div>

      <div className="login-container">
        {/* Bagian kiri */}
        <div className="login-left">
          <h2>Daftar Member Nova Cafe</h2>
          <div className="login-info-box">
            <p>
              Buat akun baru dan nikmati berbagai keuntungan sebagai member Nova
              Cafe.
            </p>
            <ul>
              <li>🎁 Hadiah Spesial Ulang Tahun</li>
              <li>💸 Akses Promo Eksklusif</li>
              <li>⭐ Kumpulkan Poin Setiap Pembelian</li>
            </ul>
          </div>

          <div className="history-link">
            <Link to="/login" className="btn-history">
              🔑 Sudah punya akun? Login di sini
            </Link>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="login-right">
          <div className="auth-tabs">
            <button onClick={() => navigate("/login")} className="">
              Login
            </button>
            <button className="active">Register</button>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <small>* indicates required field</small>

            <input
              type="text"
              placeholder="* Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="* Nomor Telepon"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="* Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="* Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="* Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="btn-sign">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
