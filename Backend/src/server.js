import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Tes endpoint dasar
app.get("/", (req, res) => {
  res.send("☕ Nova Café Backend berjalan!");
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
