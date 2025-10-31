import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import heroBg from '../../assets/image/herobg.jpg';
import iconNext from '../../assets/icon/next.svg';
import feature1 from '../../assets/icon/coffee-beans.svg';
import feature2 from '../../assets/icon/awward.svg';
import feature3 from '../../assets/icon/clock.svg';
import feature4 from '../../assets/icon/experience.svg';
import cafeImg from '../../assets/image/green-cafe.jpg';
import productImg1 from '../../assets/image/Oops!.jpg';
import productImg2 from '../../assets/image/kate laine.jpg';
import productImg3 from '../../assets/image/hot matcha.jpg';
import productImg4 from '../../assets/image/gingerbread.jpg';
import productImg5 from '../../assets/image/gingerbread latte.jpg';
import productImg6 from '../../assets/image/garifulina.jpg';
import menu from '../../assets/image/bublegum.png';
import avatar1 from '../../assets/image/pavel.jpg';
import avatar2 from '../../assets/image/juan.jpg';
import avatar3 from '../../assets/image/eric.jpg';
import avatar4 from '../../assets/image/divaris.jpg';
import avatar5 from '../../assets/image/christina.jpg';


const Home = () => {
  const products = [1,2,3,4]; // replace with real data later
  return (
    <div className="page-home">
      <section className="hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <h1>Nikmati Secangkir Kebahagiaan di <b>Nova Cafe</b></h1>
          <p>Nikmati secangkir kopi istimewa, suasana hangat, dan momen berkesan bersama orang terdekat.</p>
          <div className="hero-btn">
            <Link to="/menu" className="btn primary">Lihat Menu <img src={iconNext} alt="next" /></Link>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature">
          <img src={feature1} alt="" />
          <h4>Premium Quality</h4>
          <p>Bijian pilihan, racikan ahli.</p>
        </div>
        <div className="feature">
          <img src={feature2} alt="" />
          <h4>Award winning</h4>
          <p>Kualitas yang diakui.</p>
        </div>
        <div className="feature">
          <img src={feature3} alt="" />
          <h4>Quick Service</h4>
          <p>Pesan cepat, siap santap.</p>
        </div>
        <div className="feature">
          <img src={feature4} alt="" />
          <h4>Expert Baristas</h4>
          <p>Barista berpengalaman.</p>
        </div>
      </section>

      <section className="about container">
        <div className="about-left">
          <div className="circle-img">
            <img src={cafeImg} alt="Cafe" />
          </div>
        </div>
        <div className="about-right">
          <h3>Tentang Nova Cafe</h3>
          <p>Di Nova Cafe, kami percaya bahwa secangkir kopi bukan sekadar minuman, tetapi pengalaman. Suasana hangat, aroma kopi khas, dan layanan ramah membuat setiap momen berkesan.</p>
          <Link to="/about" className="btn small">Selengkapnya</Link>
        </div>
      </section>
      {/* promo */}
      <section className="promo container">
        <div className="promo-card">
          <div className="promo-left">
            <h3>Feel the magic of the season</h3>
            <p>Special winter. Cicipi menu spesial musim ini, penuh rasa dan kehangatan.</p>
            <Link to="/menu" className="btn">Order Now</Link>
          </div>
          <div className="promo-grid">
            <img src={productImg1} alt="" />
            <img src={productImg2} alt="" />
            <img src={productImg3} alt="" />
            <img src={productImg4} alt="" />
            <img src={productImg5} alt="" />
            <img src={productImg6} alt="" />

          </div>
        </div>
      </section>

      <section className="products container">
        <h3 className="section-title">Popular on the Nova Cafe</h3>
        <div className="product-grid">
          {products.map((p,i) => (
            <article className="product-card" key={i}>
              <img src={menu} alt={`Product ${i}`} />
              <h4>Frappe mango</h4>
              <p className="price">Rp. 45.000</p>
              <button className="btn add">Tambah ke keranjang</button>
            </article>
          ))}
        </div>
        <div className="center">
          <Link to="/menu" className="btn outline">Lihat Semua Menu</Link>
        </div>
      </section>

      <section className="testimonials container">
        <h3>Testimoni Pelanggan</h3>
        <div className="testi-row">
          <div className="testi">
            <img src={avatar1} alt="customer" />
            <h5>Tommy</h5>
            <p>"Kopi terbaik yang pernah saya coba! Suasana cozy dan pelayanan ramah."</p>
          </div>
          <div className="testi">
            <img src={avatar2} alt="customer" />
            <h5>Rina</h5>
            <p>"Menu beragam dan rasanya konsisten setiap kunjungan."</p>
          </div>
          <div className="testi">
            <img src={avatar3} alt="customer" />
            <h5>Budi</h5>
            <p>"Tempat nongkrong yang nyaman untuk kerja dan berkumpul."</p>
          </div>
          <div className="testi">
            <img src={avatar4} alt="customer" />
            <h5>Budi</h5>
            <p>"Tempat nongkrong yang nyaman untuk kerja dan berkumpul."</p>
          </div>
          <div className="testi">
            <img src={avatar5} alt="customer" />
            <h5>Budi</h5>
            <p>"Tempat nongkrong yang nyaman untuk kerja dan berkumpul."</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;