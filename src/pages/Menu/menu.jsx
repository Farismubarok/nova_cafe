import React from 'react'
import CardMenu from '../../components/Card/card.jsx'
import './menu.css'

const Menu = () => {
  // Sample menu data - replace with your actual menu items
  const menuItems = Array(24).fill().map((_, index) => ({
    id: index + 1,
    name: `Menu Item ${index + 1}`,
    price: 45000,
    image: `/path-to-your-image-${index + 1}.jpg`
  }));

  const handleAddToCart = (itemId) => {
    // Add your cart logic here
    console.log(`Added item ${itemId} to cart`);
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        {menuItems.map((item) => (
          <CardMenu
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            onAddToCart={() => handleAddToCart(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;