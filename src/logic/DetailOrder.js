// src/logic/DetailOrderLogic.js

// Topping untuk minuman
export const drinkToppings = [
  { name: "Whipped Cream", price: 5000 },
  { name: "Extra Whipped Cream", price: 15000 },
  { name: "Caramel Drizzle", price: 5000 },
  { name: "Mocha Drizzle", price: 6000 },
  { name: "Caramel Syrup", price: 5000 },
  { name: "Vanilla Syrup", price: 5000 },
];

// Topping untuk makanan
export const foodToppings = [
  { name: "Telur Ceplok", price: 5000 },
  { name: "Ayam", price: 15000 },
  { name: "Bakso", price: 5000 },
  { name: "Sosis", price: 6000 },
  { name: "Ati Ampela", price: 5000 },
  { name: "Seafood", price: 5000 },
];

// Harga tambahan untuk ukuran
export const sizePrice = {
  Small: 0,
  Medium: 5000,
  Large: 10000,
};

// Harga tambahan untuk level pedas
export const spicyPrice = {
  Normal: 0,
  Medium: 5000,
  Hot: 10000,
};

// Harga tambahan untuk level es
export const icePrice = {
  "Less Ice": 0,
  "Normal Ice": 0,
  "Extra Ice": 0,
};

// Format harga ke Rupiah
export const formatPrice = (price) => {
  if (!price && price !== 0) return "0";
  return price.toLocaleString("id-ID");
};

// Hitung total harga berdasarkan semua pilihan
export const calculateTotal = (
  basePrice, 
  toppings, 
  quantity, 
  toppingList,
  portion = "Small",
  spicy = "Normal",
  ice = "Normal Ice"
) => {
  // Debug log
  console.log("=== Calculate Total Debug ===");
  console.log("Base Price:", basePrice);
  console.log("Portion:", portion);
  console.log("Spicy:", spicy);
  console.log("Ice:", ice);
  console.log("Toppings:", toppings);
  console.log("Quantity:", quantity);
  
  // Hitung total harga topping
  const toppingTotal = toppings.reduce((sum, toppingName) => {
    const found = toppingList.find((item) => item.name === toppingName);
    const toppingPrice = found ? found.price : 0;
    console.log(`Topping: ${toppingName}, Price: ${toppingPrice}`);
    return sum + toppingPrice;
  }, 0);
  
  // Tambahan harga dari pilihan ukuran
  const portionExtra = sizePrice[portion] || 0;
  
  // Tambahan harga dari pilihan pedas
  const spicyExtra = spicyPrice[spicy] || 0;
  
  // Tambahan harga dari pilihan es (jika ada)
  const iceExtra = icePrice[ice] || 0;
  
  console.log("Topping Total:", toppingTotal);
  console.log("Portion Extra:", portionExtra);
  console.log("Spicy Extra:", spicyExtra);
  console.log("Ice Extra:", iceExtra);
  
  // Total = (base price + portion + spicy/ice + topping) × quantity
  const finalTotal = (basePrice + portionExtra + spicyExtra + iceExtra + toppingTotal) * quantity;
  console.log("Final Total:", finalTotal);
  console.log("========================");
  
  return finalTotal;
};

// Opsi umum untuk ukuran/porsi/pedas
export const commonOptions = ["Small", "Medium", "Large"];