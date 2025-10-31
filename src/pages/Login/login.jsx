import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import logo from '../../assets/logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/"); // setelah login ke home
    } else {
      setError("Email atau password salah");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Logo di kiri atas */}
      <div className="login-header">
        <img src={logo} alt="Nova Cafe" className="login-logo" />
      </div>

      <div className="login-container">
        {/* Bagian kiri */}
        <div className="login-left">
          <h2>Selamat datang di Nova Cafe</h2>
          <div className="login-info-box">
            <p>
              Bergabunglah dengan ribuan pecinta kopi dan nikmati berbagai
              keuntungan eksklusif member.
            </p>
            <ul>
              <li>🎁 Birthday Reward Special</li>
              <li>💸 Akses Promo</li>
              <li>⭐ Kumpulkan Poin setiap pembelian</li>
            </ul>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="login-right">
          <div className="auth-tabs">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <small>* indicates required field</small>

            <input
              type="email"
              placeholder="* Username or email address"
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

            <label className="checkbox">
              <input type="checkbox" />
              Keep me signed in
            </label>

            {error && <p className="error">{error}</p>}

            <div className="auth-links">
              <a href="#">Forgot Your Username ?</a>
              <a href="#">Forgot Your Password ?</a>
            </div>

            <button type="submit" className="btn-sign">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

