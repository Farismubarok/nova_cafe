import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routers/authRoutes.js";
import menuRoutes from "./routers/menuRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import favoriteRoutes from "./routers/favoriteRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import cartRoutes from "./routers/cartRoutes.js";

dotenv.config();

// Setup untuk __dirname di ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve gambar menu dari folder public/images
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Mount routes
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/categories", categoryRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

// Basic health endpoint
app.get("/", (req, res) => {
  res.send("☕ Nova Café Backend berjalan!");
});

export default app;
