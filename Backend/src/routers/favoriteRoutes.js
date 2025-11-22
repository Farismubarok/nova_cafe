import express from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controller/favoriteController.js";

const router = express.Router();

// GET /favorites/:userId
router.get("/:userId", getFavorites);

// POST /favorites  { user_id, menu_id }
router.post("/", addFavorite);

// DELETE /favorites/:userId/:menuId
router.delete("/:userId/:menuId", removeFavorite);

export default router;
