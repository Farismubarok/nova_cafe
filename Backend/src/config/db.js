import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Konfigurasi koneksi MySQL memakai environment variables.
// Variabel yang digunakan: DB_HOST, DB_USER, DB_PASS, DB_NAME
export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "novaa",
  // optional: port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal terhubung ke database:", err);
  } else {
    console.log("✅ Terhubung ke database MySQL");
  }
});
