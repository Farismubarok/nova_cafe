import { db } from "../config/db.js";

export const MenuCategory = {
  // Ambil semua kategori
  getAll: (callback) => {
    const sql = `
      SELECT 
        mc.category_id,
        mc.category_name,
        COUNT(m.menu_id) as total_menu
      FROM menu_category mc
      LEFT JOIN menu m ON mc.category_id = m.category_id
      GROUP BY mc.category_id, mc.category_name
      ORDER BY mc.category_id
    `;
    db.query(sql, callback);
  },

  // Ambil kategori berdasarkan ID
  getById: (categoryId, callback) => {
    const sql = `
      SELECT 
        mc.category_id,
        mc.category_name,
        COUNT(m.menu_id) as total_menu
      FROM menu_category mc
      LEFT JOIN menu m ON mc.category_id = m.category_id
      WHERE mc.category_id = ?
      GROUP BY mc.category_id, mc.category_name
    `;
    db.query(sql, [categoryId], callback);
  },

  // Tambah kategori baru
  create: (categoryName, callback) => {
    const sql = "INSERT INTO menu_category (category_name) VALUES (?)";
    db.query(sql, [categoryName], callback);
  },

  // Update nama kategori
  update: (categoryId, categoryName, callback) => {
    const sql = "UPDATE menu_category SET category_name = ? WHERE category_id = ?";
    db.query(sql, [categoryName, categoryId], callback);
  },

  // Hapus kategori (hanya jika tidak ada menu yang menggunakan)
  delete: (categoryId, callback) => {
    // Cek dulu apakah ada menu yang menggunakan kategori ini
    db.query(
      "SELECT COUNT(*) as menuCount FROM menu WHERE category_id = ?",
      [categoryId],
      (err, results) => {
        if (err) return callback(err);
        
        if (results[0].menuCount > 0) {
          return callback(new Error('Tidak bisa menghapus kategori yang masih digunakan oleh menu'));
        }

        // Jika aman, hapus kategori
        const sql = "DELETE FROM menu_category WHERE category_id = ?";
        db.query(sql, [categoryId], callback);
      }
    );
  }
};