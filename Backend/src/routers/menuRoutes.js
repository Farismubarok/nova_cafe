import express from "express";
import { 
  getAllMenus, 
  getMenusByCategory,
  getAllCategories,
  getMenuById, 
  createMenu, 
  updateMenu, 
  deleteMenu 
} from "../controller/menuController.js";

const router = express.Router();

// GET /menu - Get all menu items grouped by category
router.get("/", getAllMenus);

// GET /menu/categories - Get all categories
router.get("/categories", getAllCategories);

// GET /menu/category/:categoryId - Get menu items by category
router.get("/category/:categoryId", getMenusByCategory);

// GET /menu/:menuId - Get single menu item
router.get("/:menuId", getMenuById);

// POST /menu - Create new menu item
router.post("/", createMenu);

// PUT /menu/:menuId - Update menu item
router.put("/:menuId", updateMenu);

// DELETE /menu/:menuId - Delete menu item
router.delete("/:menuId", deleteMenu);

export default router;