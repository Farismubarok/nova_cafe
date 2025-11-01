import React from "react";
import "./MenuPage.css";

const menuData = {
  Coffee: [
    { name: "Iced Coffee", price: 45000, img: "/images/iced-coffee.jpg" },
    { name: "Americano", price: 45000, img: "/images/americano.jpg" },
    { name: "Iced Americano", price: 45000, img: "/images/iced-americano.jpg" },
    { name: "Cappuccino", price: 45000, img: "/images/cappuccino.jpg" },
    { name: "Macchiato", price: 45000, img: "/images/macchiato.jpg" },
  ],
  Tea: [
    { name: "Hot Matcha", price: 45000, img: "/images/matcha.jpg" },
    { name: "Thai Tea", price: 45000, img: "/images/thai-tea.jpg" },
    { name: "Lemon Tea", price: 45000, img: "/images/lemon-tea.jpg" },
    { name: "Teh Tarik", price: 45000, img: "/images/teh-tarik.jpg" },
    { name: "Teh Manis", price: 45000, img: "/images/teh-manis.jpg" },
  ],
  Frappucino: [
    { name: "Frappe Mango", price: 45000, img: "/images/frappe-mango.jpg" },
    { name: "Frappe Choco", price: 45000, img: "/images/frappe-choco.jpg" },
    { name: "Frappe Thai Tea Milk", price: 45000, img: "/images/frappe-thai.jpg" },
    { name: "Frappe Matcha", price: 45000, img: "/images/frappe-matcha.jpg" },
  ],
  Food: [
    { name: "Nasi Goreng", price: 45000, img: "/images/nasgor.jpg" },
    { name: "Chicken Teriyaki", price: 45000, img: "/images/teriyaki.jpg" },
    { name: "Meatball", price: 45000, img: "/images/meatball.jpg" },
    { name: "Spaghetti", price: 45000, img: "/images/spaghetti.jpg" },
    { name: "French Fries", price: 45000, img: "/images/fries.jpg" },
  ],
  Refreshers: [
    { name: "Bubblegum", price: 45000, img: "/images/bubblegum.jpg" },
    { name: "Lemon Mint", price: 45000, img: "/images/lemon-mint.jpg" },
    { name: "Orange", price: 45000, img: "/images/orange.jpg" },
    { name: "Raspberry", price: 45000, img: "/images/raspberry.jpg" },
    { name: "Watermelon", price: 45000, img: "/images/watermelon.jpg" },
  ],
};

const MenuPage = () => {
  return (
    <div className="menu-page">
      {/* Header Banner */}
      <section className="menu-banner">
        <div className="banner-text">
          <h4>Refreshing Drink</h4>
          <h2>Matcha Cream Cloud</h2>
          <p>
            Matcha pilihan dengan aroma khas dan rasa autentik menyegarkan,
            setiap tegukan memberikan kesegaran alami.
          </p>
          <button className="order-btn">Order Now</button>
        </div>
        <img
          src="/images/matcha-banner.jpg"
          alt="Matcha Cream Cloud"
          className="banner-img"
        />
      </section>

      {/* Menu Sections */}
      {Object.keys(menuData).map((category) => (
        <section key={category} className="menu-section">
          <h3>{category}</h3>
          <div className="menu-grid">
            {menuData[category].map((item, index) => (
              <div className="menu-card" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="menu-info">
                  <h4>{item.name}</h4>
                  <p>Rp. {item.price.toLocaleString("id-ID")}</p>
                  <button className="add-btn">Tambah ke Keranjang</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuPage;
