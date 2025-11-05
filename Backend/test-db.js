import express from "express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // default XAMPP
  password: "",       // biasanya kosong
  database: "novaa", // ganti sesuai database kamu
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal koneksi ke MySQL:", err);
  } else {
    console.log("✅ Terhubung ke MySQL (XAMPP)!");
  }
});

app.get("/", (req, res) => {
  res.send("Server Nova Cafe berjalan 🚀");
});

app.listen(5000, () => console.log("Server aktif di http://localhost:5000"));
