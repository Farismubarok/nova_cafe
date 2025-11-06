import { db } from "../config/db.js";

export const Menu = {
  getAll: (callback) => {
    const sql = "SELECT * FROM menu";
    db.query(sql, callback);
  },
  
  getById: (id, callback) => {
    const sql = "SELECT * FROM menu WHERE id = ?";
    db.query(sql, [id], callback);
  },
  
  create: (menuData, callback) => {
    const sql = "INSERT INTO menu SET ?";
    db.query(sql, menuData, callback);
  },
  
  update: (id, menuData, callback) => {
    const sql = "UPDATE menu SET ? WHERE id = ?";
    db.query(sql, [menuData, id], callback);
  },
  
  delete: (id, callback) => {
    const sql = "DELETE FROM menu WHERE id = ?";
    db.query(sql, [id], callback);
  }
};