import React from "react";
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

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Nova Cafe" />
          <h1>Nova Cafe</h1>
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      {!isLoggedIn ? (
        <div className="navbar-auth">
          <button className="btn-login" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="btn-signup">Sign Up</button>
        </div>
      ) : (
        <div className="navbar-user">
          <div className="nav-item">
            <img src={userLogo} alt="Account" />
            <span>Account</span>
          </div>
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
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
