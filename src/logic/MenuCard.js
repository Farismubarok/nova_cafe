// src/logic/MenuCard.js
import { useState, useEffect } from 'react';
import { menuService } from '../services/menuService';

// Default gambar jika image_path kosong atau error
const DEFAULT_IMAGE = 'https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png';

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