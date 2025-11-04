import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // default XAMPP
  password: "",        // kosong di XAMPP default
  database: "nova_cafe"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal terhubung ke database:", err);
  } else {
    console.log("✅ Terhubung ke database MySQL (XAMPP)");
  }
});
