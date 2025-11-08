// src/logic/MenuCard.js
import { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';

// 🧊 Import Gambar — Dikelompokkan Berdasarkan Kategori

// ☕ Coffee
import coffee1 from "../assets/image/iced coffee.png";
import coffee2 from "../assets/image/hot americano.png";
import coffee3 from "../assets/image/iced americano.png";
import coffee4 from "../assets/image/hot cappucino.png";
import coffee5 from "../assets/image/machiato.png";

// 🍵 Tea
import tea1 from "../assets/image/hot matcha.png";
import tea2 from "../assets/image/iced thai tea.png";
import tea3 from "../assets/image/lemon tea.png";
import tea4 from "../assets/image/teh tarik.png";
import tea5 from "../assets/image/tea.png";

// 🍧 Frappucino
import frappe1 from "../assets/image/mango.png";
import frappe2 from "../assets/image/choco.png";
import frappe3 from "../assets/image/mango honey.png";
import frappe4 from "../assets/image/MATCHA.png";
import frappe5 from "../assets/image/strawberry.png";

// 🍽️ Food
import food1 from "../assets/image/nas gor.png";
import food2 from "../assets/image/teriyaki.png";
import food3 from "../assets/image/mmeat ball.png";
import food4 from "../assets/image/spaghetti meatball.png";
import food5 from "../assets/image/french firies cheesy.png";

// 🍹 Refresher
import refresher1 from "../assets/image/bublegum.png";
import refresher2 from "../assets/image/lemon iced mint.png";
import refresher3 from "../assets/image/lemon iced.png";
import refresher4 from "../assets/image/raspberry.png";
import refresher5 from "../assets/image/watermellon.png";

// Mapping gambar lokal sebagai fallback
const localImages = {
  'Iced Coffee': coffee1,
  'Hot Americano': coffee2,
  'Iced Americano': coffee3,
  'Cappuccino': coffee4,
  'Macchiato': coffee5,
  'Hot Matcha': tea1,
  'Iced Thai Tea': tea2,
  'Lemon Tea': tea3,
  'Teh Tarik': tea4,
  'Teh Manis': tea5,
  'Frappe Mango': frappe1,
  'Frappe Choco': frappe2,
  'Frappe Mango Honey': frappe3,
  'Frappe Matcha': frappe4,
  'Frappe Strawberry': frappe5,
  'Nasi Goreng': food1,
  'Chicken Teriyaki': food2,
  'Meatball': food3,
  'Spaghetti Meatball': food4,
  'French Fries Cheesy': food5,
  'Bubblegum': refresher1,
  'Lemon Mint': refresher2,
  'Orange Lemonade': refresher3,
  'Raspberry': refresher4,
  'Watermelon': refresher5,
};

// Format harga
export const formatPrice = (price) => `Rp. ${price.toLocaleString("id-ID")}`;

// Hook untuk mengambil data menu
export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        console.log('Fetching menu items...');
        const data = await menuService.getAllMenus();
        console.log('Received menu data:', data);
        
        // Transform data dan gunakan image_path langsung dari database
        const transformedData = data.map(category => {
          console.log('Processing category:', category);
          return {
            ...category,
            items: category.items.map(item => {
              console.log('Processing menu item:', item);
              return {
                ...item,
                // Gunakan URL langsung dari image_path, atau default image jika kosong
                image: item.image || DEFAULT_IMAGE,
                price: Number(item.price)
              };
            })
          };
        });
        console.log('Transformed data:', transformedData);
        setMenuItems(transformedData);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err.message);
        // Fallback ke data lokal jika ada error
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
};
