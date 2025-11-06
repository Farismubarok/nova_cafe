import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useMenu } from "../../logic/MenuCard";

const MenuPage = () => {
  const navigate = useNavigate();
  const { menuItems, loading, error } = useMenu();

  // Group menu items by category
  const menuByCategory = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push({
        ...item,
        img: item.image // use the image from our hook
      });
      return acc;
    }, {});
  }, [menuItems]);

  const handleOrder = (item) => {
    // Arahkan ke halaman detail dan kirim data produk yang diklik
    navigate("/detail-order", { state: item });
  };

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

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>Loading menu items...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          <p>Error loading menu: {error}</p>
        </div>
      )}

      {/* Menu Sections */}
      {!loading && !error && Object.keys(menuByCategory).map((category) => (
        <section key={category} className="menu-section">
          <h3>{category}</h3>
          <div className="menu-grid">
            {menuByCategory[category].map((item) => (
              <div className="menu-card" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="menu-info">
                  <h4>{item.name}</h4>
                  <p>Rp. {item.price.toLocaleString("id-ID")}</p>
                  <button className="add-btn" onClick={() => handleOrder(item)}>Add</button>
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
