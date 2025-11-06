import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillBasket2Fill } from "react-icons/bs";
import '../Home/Home.css';

// Gambar dan ikon
import heroBg from '../../assets/image/herobg.jpg';
import iconNext from '../../assets/icon/next.svg';
import feature1 from '../../assets/icon/coffee-beans.svg';
import feature2 from '../../assets/icon/awward.svg';
import feature3 from '../../assets/icon/clock.svg';
import feature4 from '../../assets/icon/experience.svg';
import cafeImg from '../../assets/image/green-cafe.jpg';

// Produk
import productImg1 from '../../assets/image/Oops!.jpg';
import productImg2 from '../../assets/image/kate laine.jpg';
import productImg3 from '../../assets/image/hot matcha.jpg';
import productImg4 from '../../assets/image/gingerbread.jpg';
import productImg5 from '../../assets/image/gingerbread latte.jpg';
import productImg6 from '../../assets/image/garifulina.jpg';
import menu from '../../assets/image/bublegum.png';

// Avatar pelanggan
import avatar1 from '../../assets/image/pavel.jpg';
import avatar2 from '../../assets/image/juan.jpg';
import avatar3 from '../../assets/image/eric.jpg';
import avatar4 from '../../assets/image/divaris.jpg';
import avatar5 from '../../assets/image/christina.jpg';

// alias imports
const interiorCafe = cafeImg;
const greenCafe = cafeImg;
const oops = productImg1;
const kateLaine = productImg2;
const matcha = productImg3;
const gingerbread = productImg4;
const gingerbreadLatte = productImg5;
const garifulina = productImg6;

const Home = () => {
  const products = [1, 2, 3, 4];

  // ===== TESTIMONIALS DATA + STATE =====
  const testimonials = [
    {
      name: "Christina",
      text: "Kopinya luar biasa lembut dan wangi, bikin semangat pagi-pagi!",
      img: avatar5,
    },
    {
      name: "Eric",
      text: "Baristanya ramah banget! Aku suka latte art-nya yang unik.",
      img: avatar3,
    },
    {
      name: "Tommy",
      text: "Kopi terbaik yang pernah saya coba! Suasana cafe-nya sangat nyaman dan cozy.",
      img: avatar2,
    },
    {
      name: "Divaris",
      text: "Tempat yang pas buat kerja santai, Wi-Fi kencang dan suasananya chill.",
      img: avatar4,
    },
    {
      name: "Rashed",
      text: "Croissant dan cappuccino-nya kombinasi sempurna. Recommended banget!",
      img: avatar1,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2); // Default: Tommy di tengah

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero" id="home" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Nikmati Secangkir Kebahagiaan di<br />
            <span className="highlight">Nova Cafe</span>
          </h1>
          <p className="hero-subtitle">
            Nikmati secangkir kopi istimewa, suasana hangat, dan momen berkesan bersama orang terdekat
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn-primary">
              Lihat Menu
              <img src={iconNext} alt="next" style={{ width: 20, height: 20, marginLeft: 8 }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-home">
        <div className="feature-card animate-fade-in delay-100">
          <img src={feature1} alt="Premium Quality" />
          <h3>Premium Quality</h3>
          <p>Biji kopi pilihan dari perkebunan terbaik Indonesia</p>
        </div>
        <div className="feature-card animate-fade-in delay-200">
          <img src={feature2} alt="Award Winning" />
          <h3>Award winning</h3>
          <p>Biji kopi pilihan dari perkebunan terbaik Indonesia</p>
        </div>
        <div className="feature-card animate-fade-in delay-300">
          <img src={feature3} alt="Quick Service" />
          <h3>Quick Service</h3>
          <p>Biji kopi pilihan dari perkebunan terbaik Indonesia</p>
        </div>
        <div className="feature-card animate-fade-in delay-400">
          <img src={feature4} alt="Expert Baristas" />
          <h3>Expert Baristas</h3>
          <p>Biji kopi pilihan dari perkebunan terbaik Indonesia</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-images-home">
          <img src={interiorCafe} alt="Cafe Interior" className="about-img-main" />
          <img src={greenCafe} alt="Coffee" className="about-img-small" />
        </div>
        <div className="about-content">
          <p className="about-text">
            Di Nova Cafe, kami percaya bahwa secangkir kopi bukan sekadar minuman, tapi pengalaman.<br /><br />
            Suasana interior yang nyaman, aroma kopi yang khas, dan pelayanan yang ramah kami hadirkan untuk membuat setiap momen menjadi lebih berkesan.<br /><br />
            Hadir sejak awal dengan semangat kebersamaan, Nova Cafe menjadi tempat berkumpulnya teman, keluarga, dan cerita.
          </p>
          <Link to="/about" className="btn-secondary">
            Selengkapnya
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16H26M26 16L16 6M26 16L16 26" stroke="white" strokeWidth="2" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Winter Special Section */}
      <section className="winter-special">
        <div className="winter-content">
          <h2 className="winter-title">
            Feel the magic of the season<br />
            <span className="winter-highlight">Special winter</span>
          </h2>
          <p className="winter-text">
            Nikmati kehangatan musim dingin dengan minuman spesial edisi Natal yang manis dan creamy.
          </p>
          <button className="btn-winter">
            Order Now
            <svg width="24" height="24" viewBox="0 0 24 12" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#017143" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="winter-gallery">
          <img src={oops} alt="Winter Drink 1" />
          <img src={gingerbreadLatte} alt="Winter Drink 2" />
          <img src={kateLaine} alt="Winter Drink 3" />
          <img src={gingerbread} alt="Winter Drink 4" />
          <img src={matcha} alt="Winter Drink 5" />
          <img src={garifulina} alt="Winter Drink 6" />
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="popular-menu" id="menu">
        <div className="section-header">
          <h2>Popular on the Nova Cafe</h2>
        </div>

        <div className="menu-grid-home">
          {products.map((_, i) => (
            <div className="menu-card" key={i}>
              <img src={menu} alt="Frappe Mango" />
              <p>Frappe mango</p>
              <h4 className="price-home">Rp. 45.000</h4>
              <button className="btn-cart">
                <BsFillBasket2Fill className="icon-small" />
                Tambah ke Keranjang
              </button>
            </div>
          ))}
        </div>

        <Link to="/menu" className="btn-view-all">
          Lihat Semua Menu
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M5 13H21M21 13L13 5M21 13L13 21" stroke="#017143" strokeWidth="2" />
          </svg>
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Testimoni Pelanggan</h2>

        <div className="testimonial-avatars">
          {testimonials.map((t, i) => (
            <img
              key={i}
              src={t.img}
              alt={t.name}
              onClick={() => setActiveIndex(i)}
              className={`avatar ${i === activeIndex ? "avatar-large" : "avatar-small"}`}
              style={{
                cursor: "pointer",
                border: i === activeIndex ? "3px solid #017143" : "none",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <p className="testimonial-name">{testimonials[activeIndex].name}</p>
        <p className="testimonial-text">
          "{testimonials[activeIndex].text}"
        </p>
      </section>
    </div>
  );
};

export default Home;
