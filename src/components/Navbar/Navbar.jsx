import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css";
import logo from "../../assets/logo.svg";
import userLogo from "../../assets/icon/user.svg";
import historyLogo from "../../assets/icon/history.svg";
import favoriteIcon from "../../assets/icon/fav-fill.svg";
import bagLogo from "../../assets/icon/shopping bag.svg";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
    {/* navbar logo */}
    <nav className='navbar'> 
      <div className="logo">
        <img src={logo} alt="Nova Cafe"/>
        <h1>Nova Cafe</h1>
      </div>
      {/* Mobile menu toggle (hamburger) */}
      <button
        className={`navbar-toggle ${isMenuOpen ? 'open' : ''}`}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(prev => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      {/* navbar links */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
      {/* Button CTA (sebelum login) */}
      {!isLoggedIn ? (
        <div className="navbar-auth">
          <button className="btn-login" onClick={() => navigate('/login')}>Log in</button>
          <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      ) : (
        <div className="navbar-user">
          <button onClick={() => navigate("/profile")}>
            <img src={userLogo} alt="" /><span>Account</span></button>
          <div className="nav-item">
            <img src={historyLogo} alt="History" />
            <span>History</span>
          </div>
          <div className="nav-item">
            <img src={favoriteIcon} alt="Favorite" />
            <span>Favorite</span>
          </div>
          <div className="nav-item cart">
            <img src={bagLogo} alt="Cart" />
            <span>Cart</span>
          </div>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
    </header>
  );
};

export default Navbar;
