import { MenuCategory } from "../models/MenuCategory.js";

// Ambil semua kategori menu
export const getAllCategories = (req, res) => {
  MenuCategory.getAll((err, results) => {
    if (err) {
      console.error("Error mengambil kategori:", err);
      return res.status(500).json({ 
        message: "Gagal mengambil data kategori", 
        error: err 
      });
    }
    res.json(results);
  });
};

// Ambil kategori berdasarkan ID
export const getCategoryById = (req, res) => {
  const { categoryId } = req.params;
  MenuCategory.getById(categoryId, (err, results) => {
    if (err) {
      console.error("Error mengambil kategori:", err);
      return res.status(500).json({ 
        message: "Gagal mengambil data kategori", 
        error: err 
      });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ 
        message: "Kategori tidak ditemukan" 
      });
    }
    res.json(results[0]);
  });
};

// Tambah kategori baru
export const createCategory = (req, res) => {
  const { category_name } = req.body;
  
  if (!category_name) {
    return res.status(400).json({ 
      message: "Nama kategori harus diisi" 
    });
  }

  MenuCategory.create(category_name, (err, result) => {
    if (err) {
      console.error("Error membuat kategori:", err);
      return res.status(500).json({ 
        message: "Gagal membuat kategori baru", 
        error: err 
      });
    }
    res.status(201).json({
      message: "Kategori berhasil dibuat",
      categoryId: result.insertId
    });
  });
};

// Update kategori
export const updateCategory = (req, res) => {
  const { categoryId } = req.params;
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({ 
      message: "Nama kategori harus diisi" 
    });
  }

  MenuCategory.update(categoryId, category_name, (err, result) => {
    if (err) {
      console.error("Error update kategori:", err);
      return res.status(500).json({ 
        message: "Gagal mengupdate kategori", 
        error: err 
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Kategori tidak ditemukan" 
      });
    }
    res.json({ message: "Kategori berhasil diupdate" });
  });
};

// Hapus kategori
export const deleteCategory = (req, res) => {
  const { categoryId } = req.params;
  
  MenuCategory.delete(categoryId, (err, result) => {
    if (err) {
      // Cek apakah error karena kategori masih digunakan
      if (err.message.includes('masih digunakan')) {
        return res.status(400).json({ 
          message: err.message 
        });
      }
      
      console.error("Error menghapus kategori:", err);
      return res.status(500).json({ 
        message: "Gagal menghapus kategori", 
        error: err 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Kategori tidak ditemukan" 
      });
    }
    
    res.json({ message: "Kategori berhasil dihapus" });
  });
};