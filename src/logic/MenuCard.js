// src/Components/MenuCard/MenuCardLogic.js
<<<<<<< HEAD
=======
//coffe
import menu1 from "../../src/assets/image/iced coffee.png";
import menu2 from "../../src/assets/image/hot americano.png";
import menu3 from "../../src/assets/image/iced americano.png";
import menu4 from "../../src/assets/image/hot cappucino.png";
import menu5 from "../../src/assets/image/machiato.png";
//tea
import menu6 from "../../src/assets/image/hot matcha.png";
import menu7 from "../../src/assets/image/iced thai tea.png";
import menu8 from "../../src/assets/image/lemon tea.png";
import menu9 from "../../src/assets/image/teh tarik.png";
import menu10 from "../../src/assets/image/tea.png";
// farppucino
import menu11 from "../../src/assets/image/mango.png";
import menu12 from "../../src/assets/image/choco.png";
import menu13 from "../../src/assets/image/mango honey.png";
import menu14 from "../../src/assets/image/MATCHA.png";
import menu15 from "../../src/assets/image/strawberry.png";
// food
import menu16 from "../../src/assets/image/nas gor.png";
import menu17 from "../../src/assets/image/teriyaki.png";
import menu18 from "../../src/assets/image/mmeat ball.png";
import menu19 from "../../src/assets/image/spaghetti meatball.png";
import menu20 from "../../src/assets/image/french firies cheesy.png";
// refresher
import menu21 from "../../src/assets/image/bublegum.png";
import menu22 from "../../src/assets/image/lemon iced mint.png";
import menu23 from "../../src/assets/image/lemon iced.png";
import menu24 from "../../src/assets/image/raspberry.png";
import menu25 from "../../src/assets/image/watermellon.png";
>>>>>>> cfe1a60fe796cbe1d17863a8e43e0120c7f58510

// 🧊 Import Gambar — Dikelompokkan Berdasarkan Kategori

// ☕ Coffee
import coffee1 from "../../assets/image/iced coffee.png";
import coffee2 from "../../assets/image/hot americano.png";
import coffee3 from "../../assets/image/iced americano.png";
import coffee4 from "../../assets/image/hot cappucino.png";
import coffee5 from "../../assets/image/machiato.png";

// 🍵 Tea
import tea1 from "../../assets/image/hot matcha.png";
import tea2 from "../../assets/image/iced thai tea.png";
import tea3 from "../../assets/image/lemon tea.png";
import tea4 from "../../assets/image/teh tarik.png";
import tea5 from "../../assets/image/tea.png";

// 🍧 Frappucino
import frappe1 from "../../assets/image/mango.png";
import frappe2 from "../../assets/image/choco.png";
import frappe3 from "../../assets/image/mango honey.png";
import frappe4 from "../../assets/image/MATCHA.png";
import frappe5 from "../../assets/image/strawberry.png";

// 🍽️ Food
import food1 from "../../assets/image/nas gor.png";
import food2 from "../../assets/image/teriyaki.png";
import food3 from "../../assets/image/mmeat ball.png";
import food4 from "../../assets/image/spaghetti meatball.png";
import food5 from "../../assets/image/french firies cheesy.png";

// 🍹 Refresher
import refresher1 from "../../assets/image/bublegum.png";
import refresher2 from "../../assets/image/lemon iced mint.png";
import refresher3 from "../../assets/image/lemon iced.png";
import refresher4 from "../../assets/image/raspberry.png";
import refresher5 from "../../assets/image/watermellon.png";

// ===================================================================
// 📦 Data Menu (sementara hardcoded, bisa diambil dari API nanti)
// ===================================================================

export const menuItems = [
  // ☕ Coffee
  { id: 1, name: "Iced Coffee", category: "Coffee", price: 45000, image: coffee1 },
  { id: 2, name: "Hot Americano", category: "Coffee", price: 45000, image: coffee2 },
  { id: 3, name: "Iced Americano", category: "Coffee", price: 45000, image: coffee3 },
  { id: 4, name: "Cappuccino", category: "Coffee", price: 45000, image: coffee4 },
  { id: 5, name: "Macchiato", category: "Coffee", price: 45000, image: coffee5 },

  // 🍵 Tea
  { id: 6, name: "Hot Matcha", category: "Tea", price: 45000, image: tea1 },
  { id: 7, name: "Iced Thai Tea", category: "Tea", price: 45000, image: tea2 },
  { id: 8, name: "Lemon Tea", category: "Tea", price: 45000, image: tea3 },
  { id: 9, name: "Teh Tarik", category: "Tea", price: 45000, image: tea4 },
  { id: 10, name: "Teh Manis", category: "Tea", price: 45000, image: tea5 },

  // 🍧 Frappucino
  { id: 11, name: "Frappe Mango", category: "Frappucino", price: 45000, image: frappe1 },
  { id: 12, name: "Frappe Choco", category: "Frappucino", price: 45000, image: frappe2 },
  { id: 13, name: "Frappe Mango Honey", category: "Frappucino", price: 45000, image: frappe3 },
  { id: 14, name: "Frappe Matcha", category: "Frappucino", price: 45000, image: frappe4 },
  { id: 15, name: "Frappe Strawberry", category: "Frappucino", price: 45000, image: frappe5 },

  // 🍽️ Food
  { id: 16, name: "Nasi Goreng", category: "Food", price: 75000, image: food1 },
  { id: 17, name: "Chicken Teriyaki", category: "Food", price: 75000, image: food2 },
  { id: 18, name: "Meatball", category: "Food", price: 75000, image: food3 },
  { id: 19, name: "Spaghetti Meatball", category: "Food", price: 75000, image: food4 },
  { id: 20, name: "French Fries Cheesy", category: "Food", price: 45000, image: food5 },

  // 🍹 Refresher
  { id: 21, name: "Bubblegum", category: "Refresher", price: 45000, image: refresher1 },
  { id: 22, name: "Lemon Mint", category: "Refresher", price: 45000, image: refresher2 },
  { id: 23, name: "Orange Lemonade", category: "Refresher", price: 45000, image: refresher3 },
  { id: 24, name: "Raspberry", category: "Refresher", price: 45000, image: refresher4 },
  { id: 25, name: "Watermelon", category: "Refresher", price: 45000, image: refresher5 },
];

// ===================================================================
// 💰 Utility Function (Format Harga)
// ===================================================================

export const formatPrice = (price) => `Rp. ${price.toLocaleString("id-ID")}`;
