import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controller/categoryController.js";

const router = express.Router();

// GET /categories - Ambil semua kategori
router.get("/", getAllCategories);

// GET /categories/:categoryId - Ambil kategori berdasarkan ID
router.get("/:categoryId", getCategoryById);

// POST /categories - Buat kategori baru
router.post("/", createCategory);

// PUT /categories/:categoryId - Update kategori
router.put("/:categoryId", updateCategory);

// DELETE /categories/:categoryId - Hapus kategori
router.delete("/:categoryId", deleteCategory);

export default router;