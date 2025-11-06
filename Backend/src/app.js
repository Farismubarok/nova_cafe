import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routers/authRoutes.js";
import menuRoutes from "./routers/menuRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);

// Basic health endpoint
app.get("/", (req, res) => {
  res.send("☕ Nova Café Backend berjalan!");
});

export default app;
