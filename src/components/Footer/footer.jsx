import React from 'react';
import '../Footer/footer.css';
import logo from '../../assets/logo.svg';
import Fb from '../../assets/icon/facebook.svg';
import Ig from '../../assets/icon/instagram.svg';
import Twit from '../../assets/icon/x.svg';
import Locate from '../../assets/icon/locate.svg';
import Phone from '../../assets/icon/telephone.svg';
import Clock from '../../assets/icon/clock.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <div className="footer-logo">
            <img src={logo} alt="Nova Cafe Logo" />
            <h2>Nova Cafe</h2>
          </div>
          <p className="footer-desc">
            Nikmati secangkir kebahagiaan dengan kopi premium pilihan terbaik dari Nova Cafe
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={Fb} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={Ig} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={Twit} alt="Twitter" className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Menu</a></li>
            <li><a href="/store">Store</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About Nova</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <ul className="footer-links">
            <li><a href="/culture">Culture & Values</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li>
              <img src={Locate} alt="Location" className="contact-icon" />
              <span>Jl. Margonda Raya, Kecamatan Beji, Kota Depok, Jawa Barat 16424</span>
            </li>
            <li>
              <img src={Phone} alt="Phone" className="contact-icon" />
              <span>+62 821-1234-5678</span>
            </li>
            <li>
              <img src={Clock} alt="Clock" className="contact-icon" />
              <span>09.00 - 23.00 WIB</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nova Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
