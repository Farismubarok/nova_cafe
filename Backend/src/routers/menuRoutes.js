import express from "express";
import { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu } from "../controller/menuController.js";

const router = express.Router();

// GET /menu - Get all menu items
router.get("/", getAllMenus);

// GET /menu/:id - Get single menu item
router.get("/:id", getMenuById);

// POST /menu - Create new menu item
router.post("/", createMenu);

// PUT /menu/:id - Update menu item
router.put("/:id", updateMenu);

// DELETE /menu/:id - Delete menu item
router.delete("/:id", deleteMenu);

export default router;