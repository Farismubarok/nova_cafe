import { db } from "../config/db.js";

export const Menu = {
  // Get all menu items with their categories
  getAll: (callback) => {
    const sql = `
      SELECT 
        m.menu_id,
        m.menu_name,
        m.description,
        m.image_path,
        m.price,
        mc.category_id,
        mc.category_name
      FROM menu m
      JOIN menu_category mc ON m.category_id = mc.category_id
      ORDER BY mc.category_id, m.menu_name
    `;
    db.query(sql, callback);
  },
  
  // Get menu items by category
  getByCategory: (categoryId, callback) => {
    const sql = `
      SELECT 
        m.menu_id,
        m.menu_name,
        m.description,
        m.image_path,
        m.price,
        mc.category_id,
        mc.category_name
      FROM menu m
      JOIN menu_category mc ON m.category_id = mc.category_id
      WHERE m.category_id = ?
      ORDER BY m.menu_name
    `;
    db.query(sql, [categoryId], callback);
  },

  // Get single menu item with its category
  getById: (menuId, callback) => {
    const sql = `
      SELECT 
        m.menu_id,
        m.menu_name,
        m.description,
        m.image_path,
        m.price,
        mc.category_id,
        mc.category_name
      FROM menu m
      JOIN menu_category mc ON m.category_id = mc.category_id
      WHERE m.menu_id = ?
    `;
    db.query(sql, [menuId], callback);
  },

  // Create new menu item
  create: (menuData, callback) => {
    const sql = "INSERT INTO menu SET ?";
    db.query(sql, menuData, callback);
  },

  // Update menu item
  update: (menuId, menuData, callback) => {
    const sql = "UPDATE menu SET ? WHERE menu_id = ?";
    db.query(sql, [menuData, menuId], callback);
  },

  // Delete menu item
  delete: (menuId, callback) => {
    const sql = "DELETE FROM menu WHERE menu_id = ?";
    db.query(sql, [menuId], callback);
  }
};