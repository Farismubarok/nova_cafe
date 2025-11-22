// farismubarok/nova_cafe/nova_cafe-548995ea2b5bef148f7ec5bbf5d50506c2e070b1/src/pages/DetailOrder/detail-order.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";
import { IoBagHandle } from "react-icons/io5";
import {
  calculateTotal,
  formatPrice as formatPriceUtil,
} from "../../logic/DetailOrder"; // HANYA ambil fungsi utility
import { useCart } from "../../context/CartContext";
import { menuService } from "../../services/menuService"; // 💡 Import menuService
import "./detailorder.css";

const formatPrice = (price) => "Rp. " + formatPriceUtil(price || 0);

const DetailOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const menuData = state?.item || state || null;
  const { addToCart } = useCart();

  // === STATE BARU UNTUK DATA DINAMIS ===
  const [menuOptions, setMenuOptions] = useState(null); 
  const [loading, setLoading] = useState(true);

  // State untuk pilihan (size, sugar, portion, dll.)
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const basePrice = menuData?.price || 0;
  const menuId = menuData?.id || menuData?.menu_id;

  // === FETCH DATA DARI BACKEND ===
  useEffect(() => {
    if (!menuId) {
      navigate("/menu", { replace: true });
      return;
    }

    const fetchOptions = async () => {
      try {
        setLoading(true);
        // 💡 Panggil API baru
        const data = await menuService.getMenuOptionsAndToppings(menuId); 
        setMenuOptions(data);

        // Inisialisasi selectedOptions dengan nilai default (opsi pertama)
        const defaultSelections = {};
        for (const optionName in data.options) {
          if (data.options[optionName].length > 0) {
            defaultSelections[optionName] = data.options[optionName][0].value;
          }
        }
        setSelectedOptions(defaultSelections);

      } catch (e) {
        console.error("Gagal memuat opsi menu:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [menuId, navigate]);

  const uniqueDynamicToppings = useMemo(() => {
    if (!menuOptions || !menuOptions.toppings) return [];
    
    const seenNames = new Set();
    // Filter dan ambil hanya item topping pertama dengan nama unik
    return menuOptions.toppings.filter(topping => {
        if (seenNames.has(topping.name)) {
            return false; // Skip duplikat
        } else {
            seenNames.add(topping.name);
            return true;
        }
    });
  }, [menuOptions]);

  // === LOGIKA PERHITUNGAN TOTAL HARGA DINAMIS ===
  const total = useMemo(() => {
    if (!menuOptions || basePrice === 0) return 0;
    
    return calculateTotal(
      basePrice,
      toppings,
      quantity,
      menuOptions.toppings || [], // availableToppings
      selectedOptions, 
      menuOptions.options || {}   // availableOptions
    );
  }, [basePrice, toppings, quantity, selectedOptions, menuOptions]);

  // Handler untuk opsi tunggal (size, spicy, ice, sugar)
  const handleOptionChange = useCallback((optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  }, []);

  // Handler untuk topping (checkbox)
  const handleToppingChange = (name) => {
    setToppings((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };
  
  // --- LOGIKA KERANJANG & PEMBAYARAN ---
  const createCartData = () => ({
    item: {
      id: menuData.id || menuData.menu_id,
      name: menuData.name,
      image: menuData.image || menuData.img,
      price: basePrice,
      category: menuOptions.item.category,
    },
    quantity,
    ...selectedOptions, // Menyebar semua opsi dinamis (size, sugar, dll.)
    toppings,
    notes,
    totalPrice: total, // 💡 HARGA TOTAL YANG SUDAH DIHITUNG
  });

  const handleAddToCart = () => {
    if (!menuOptions) return;
    addToCart(createCartData());
    navigate("/cart");
  };

  const handleOrderNow = () => {
    if (!menuOptions) return;
    addToCart(createCartData());
    navigate("/payment");
  };

  if (loading) {
    return (
        <div style={{ padding: "100px", textAlign: "center" }}>
            <h2>Memuat Opsi Menu...</h2>
        </div>
    );
  }

  if (!menuOptions || !menuOptions.item) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>Gagal memuat data produk</h2>
        <p>Silakan kembali ke halaman menu.</p>
      </div>
    );
  }

  const dynamicOptions = menuOptions.options || {};
  const dynamicToppings = menuOptions.toppings || [];

  // --- RENDERING OPSI UTAMA ---
  const renderOptions = () => {
    return Object.keys(dynamicOptions).map(optionName => {
      const options = dynamicOptions[optionName];
      // Kapitalisasi nama opsi untuk tampilan (misal: 'size' menjadi 'Size')
      const displayName = optionName.charAt(0).toUpperCase() + optionName.slice(1); 
      
      return (
        <div className="option-group" key={optionName}>
          <h3>{displayName} Options</h3>
          <div className="option-buttons">
            {options.map(option => (
              <button
                key={option.value}
                className={selectedOptions[optionName] === option.value ? "active" : ""}
                onClick={() => handleOptionChange(optionName, option.value)}
              >
                {option.value}
                {Number(option.price) > 0 && ` (+${formatPrice(option.price)})`}
              </button>
            ))}
          </div>
        </div>
      );
    });
  };


  return (
    <div className="detail-order-page">
      {/* Product Info */}
      <section className="order-header">
        <img src={menuOptions.item.image || menuData.img} alt={menuOptions.item.name} />
        <div className="order-info">
          <h2>{menuOptions.item.name}</h2>
          <p className="price">{formatPrice(basePrice)}</p>
          <p className="desc">
            {menuOptions.item.description || "Nikmati menu khas kami dengan cita rasa gurih dan autentik. Dimasak dengan bahan pilihan berkualitas untuk rasa yang memanjakan."}
          </p>
        </div>
      </section>

      <hr />

      {/* Options (Dynamic from DB) */}
      <section className="options-section">
        {renderOptions()}
      </section>

      {/* Toppings (Dynamic from DB) */}
      <section className="topping-section">
        <h3>Tambah Topping</h3>
        <div className="topping-grid">
          {uniqueDynamicToppings.map((topping) => (
            // Menggunakan topping.id sebagai key tetap aman dan unik
            <label key={topping.id} className="topping-item">
              <input
                type="checkbox"
                checked={toppings.includes(topping.name)}
                onChange={() => handleToppingChange(topping.name)}
              />
              {topping.name}
              <span>+ {formatPrice(topping.price)}</span>
            </label>
          ))}
          {uniqueDynamicToppings.length === 0 && <p style={{ gridColumn: 'span 3', color: '#666' }}>Tidak ada topping untuk menu ini.</p>}
        </div>
      </section>

      {/* Notes */}
      <section className="notes-section">
        <h3>Catatan</h3>
        <textarea
          placeholder="Tulis catatan khusus untuk pesanan anda"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </section>

      {/* Quantity & Total */}
      <section className="summary-section">
        {/* ... quantity controls (tetap) ... */}
        <div className="quantity-box">
          <p>Jumlah</p>
          <div className="quantity-controls">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="total-box">
          <p>Total Harga</p>
          <h3>{formatPrice(total)}</h3>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="action-buttons">
        <button className="add-cart-btn" onClick={handleAddToCart}>
          <BsFillBasket2Fill className="icon-large" /> Tambah Keranjang
        </button>
        <button className="order-now-btn" onClick={handleOrderNow}>
          <IoBagHandle className="icon-large" /> Pesan Sekarang
        </button>
      </section>
    </div>
  );
};

export default DetailOrder;