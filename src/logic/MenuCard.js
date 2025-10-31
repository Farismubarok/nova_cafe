// src/Components/MenuCard/MenuCardLogic.js

import frappe1 from "../../assets/image/frappe1.jpg";
import frappe2 from "../../assets/image/frappe2.jpg";
import frappe3 from "../../assets/image/frappe3.jpg";
// ... tambahkan gambar sesuai jumlah menu

// Data Menu (bisa diambil dari API nanti)
export const menuItems = [
  { id: 1, name: "Frappe Mango", price: 45000, image: frappe1 },
  { id: 2, name: "Frappe Chocolate", price: 45000, image: frappe2 },
  { id: 3, name: "Frappe Caramel", price: 45000, image: frappe3 },
  { id: 4, name: "Matcha Latte", price: 42000, image: frappe1 },
  { id: 5, name: "Iced Americano", price: 35000, image: frappe2 },
  { id: 6, name: "Cappuccino", price: 40000, image: frappe3 },
  { id: 7, name: "Espresso", price: 30000, image: frappe1 },
  { id: 8, name: "Vanilla Latte", price: 43000, image: frappe2 },
  { id: 9, name: "Hazelnut Frappe", price: 47000, image: frappe3 },
  { id: 10, name: "Green Tea Frappe", price: 45000, image: frappe1 },
  { id: 11, name: "Lemon Tea", price: 25000, image: frappe2 },
  { id: 12, name: "Milk Tea", price: 27000, image: frappe3 },
  { id: 13, name: "Lychee Tea", price: 27000, image: frappe1 },
  { id: 14, name: "Black Coffee", price: 30000, image: frappe2 },
  { id: 15, name: "Cold Brew", price: 32000, image: frappe3 },
  { id: 16, name: "Honey Latte", price: 45000, image: frappe1 },
  { id: 17, name: "Strawberry Smoothie", price: 46000, image: frappe2 },
  { id: 18, name: "Tiramisu Frappe", price: 47000, image: frappe3 },
  { id: 19, name: "Choco Hazelnut", price: 49000, image: frappe1 },
  { id: 20, name: "Avocado Coffee", price: 50000, image: frappe2 },
];

// Logika tambahan (contoh: format harga)
export const formatPrice = (price) => {
  return "Rp. " + price.toLocaleString("id-ID");
};
