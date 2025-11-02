// src/logic/detailOrder/DetailOrderLogic.js

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

// Format harga ke Rupiah
export const formatPrice = (price) => "Rp. " + price.toLocaleString("id-ID");

// Hitung total harga berdasarkan topping dan jumlah
export const calculateTotal = (basePrice, toppings, quantity, toppingList) => {
  const toppingTotal = toppings.reduce((sum, t) => {
    const found = toppingList.find((item) => item.name === t);
    return sum + (found ? found.price : 0);
  }, 0);
  return (basePrice + toppingTotal) * quantity;
};

// Opsi umum untuk ukuran/porsi/pedas
export const commonOptions = ["Small", "Medium", "Large"];
