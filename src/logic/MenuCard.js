// src/Components/MenuCard/MenuCardLogic.js
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

// ... tambahkan gambar sesuai jumlah menu

// Data Menu (bisa diambil dari API nanti)
export const menuItems = [
  { id: 1, name: "Frappe Mango", price: 45000, image: menu1 },
  { id: 2, name: "Frappe Chocolate", price: 45000, image: menu2 },
  { id: 3, name: "Frappe Caramel", price: 45000, image: menu3 },
  { id: 4, name: "Matcha Latte", price: 42000, image: menu4 },
  { id: 5, name: "Iced Americano", price: 35000, image: menu5 },
  { id: 6, name: "Cappuccino", price: 40000, image: menu6 },
  { id: 7, name: "Espresso", price: 30000, image:  menu7 },
  { id: 8, name: "Vanilla Latte", price: 43000, image: menu8 },
  { id: 9, name: "Hazelnut Frappe", price: 47000, image: menu9 },
  { id: 10, name: "Green Tea Frappe", price: 45000, image: menu10 },
  { id: 11, name: "Lemon Tea", price: 25000, image:  menu11 },
  { id: 12, name: "Milk Tea", price: 27000, image: menu12 },
  { id: 13, name: "Lychee Tea", price: 27000, image: menu13 },
  { id: 14, name: "Black Coffee", price: 30000, image: menu14 },
  { id: 15, name: "Cold Brew", price: 32000, image:  menu15 },
  { id: 16, name: "Honey Latte", price: 45000, image: menu16 },
  { id: 17, name: "Strawberry Smoothie", price: 46000, image: menu17 },
  { id: 18, name: "Tiramisu Frappe", price: 47000, image: menu18 },
  { id: 19, name: "Choco Hazelnut", price: 49000, image: menu19 },
  { id: 20, name: "Avocado Coffee", price: 50000, image: menu20 },
];

// Logika tambahan (contoh: format harga)
export const formatPrice = (price) => {
  return "Rp. " + price.toLocaleString("id-ID");
};
