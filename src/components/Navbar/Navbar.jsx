import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import "./navbar.css";
import logo from "../../assets/logo.svg";
import userLogo from "../../assets/icon/user.svg";
import historyLogo from "../../assets/icon/history.svg";
import favoriteIcon from "../../assets/icon/fav-fill.svg";
import bagLogo from "../../assets/icon/shopping bag.svg";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const { cartItems = [] } = useCart();
  const { favoriteItems = [] } = useFavorite();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const favoriteCount = favoriteItems.length;

  return (
    <header>
      <nav className='navbar'> 
        <div className="logo-navbar">
          <img src={logo} alt="Nova Cafe"/>
          <h1>Nova Cafe</h1>
        </div>

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

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>

        {!isLoggedIn ? (
          <div className="navbar-auth">
            <button className="btn-login" onClick={() => navigate('/login')}>Log in</button>
            <button className="btn-signup" onClick={() => navigate('/register')}>Sign Up</button>
          </div>
        ) : (
          <div className="navbar-user">
            <div
              className="nav-item"
              onClick={() => navigate("/userprofile")}
              style={{ cursor: "pointer" }}
            >
              <img src={userLogo} alt="Account" />
              <span>Account</span>
            </div>
            <div className="nav-item" onClick={() => navigate("/history")} style={{ cursor: "pointer" }}>
              <img src={historyLogo} alt="History" />
              <span>History</span>
            </div>
            <div className="nav-item favorite" onClick={() => navigate("/favorite")} style={{ cursor: "pointer" }}>
              <div className="favorite-icon-wrapper">
                <img src={favoriteIcon} alt="Favorite" />
                {favoriteCount > 0 && <span className="favorite-badge">{favoriteCount}</span>}
              </div>
              <span>Favorite</span>
            </div>
            <div className="nav-item cart" onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
              <div className="cart-icon-wrapper">
                <img src={bagLogo} alt="Cart" />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </div>
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