// farismubarok/nova_cafe/nova_cafe-c4066de2b9b0f15602e7c589e4ff4651e0575227/Backend/src/models/Menu.js

import { db } from "../config/db.js";

export const Menu = {
  
  // 💡 FUNGSI YANG HILANG/TERGANTIKAN: Mengambil semua item menu
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

  // Mengambil item menu berdasarkan kategori
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

  // Mengambil item menu tunggal
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

  // Membuat item menu baru
  create: (menuData, callback) => {
    const sql = "INSERT INTO menu SET ?";
    db.query(sql, menuData, callback);
  },

  // Memperbarui item menu
  update: (menuId, menuData, callback) => {
    const sql = "UPDATE menu SET ? WHERE menu_id = ?";
    db.query(sql, [menuData, menuId], callback);
  },

  // Menghapus item menu
  delete: (menuId, callback) => {
    const sql = "DELETE FROM menu WHERE menu_id = ?";
    db.query(sql, [menuId], callback);
  },

  // Mengambil Opsi dan Topping (fungsi kustomisasi)
  getOptionsAndToppings: (menuId, callback) => {
    // 1. Ambil info menu dasar & ID Kategori
    const menuSql = `
        SELECT m.menu_id, m.menu_name, m.description, m.image_path, m.price, mc.category_id, mc.category_name
        FROM menu m
        JOIN menu_category mc ON m.category_id = mc.category_id
        WHERE m.menu_id = ?
    `;

    db.query(menuSql, [menuId], (err, menuResults) => {
        if (err || menuResults.length === 0) {
            return callback(err || new Error("Menu not found"));
        }
        
        const menu = menuResults[0];
        const categoryId = menu.category_id;
        
        // 2. Ambil Opsi Kategori (size, sugar, ice, portion)
        const optionsSql = `
            SELECT option_name, option_value, extra_price
            FROM category_option
            WHERE category_id = ?
            ORDER BY option_name, extra_price
        `;
        
        db.query(optionsSql, [categoryId], (err, optionResults) => {
            if (err) return callback(err);

            // 3. Ambil Topping yang relevan untuk kategori ini
            const toppingsSql = `
                SELECT t.topping_id, t.topping_name, t.price
                FROM toppings t
                JOIN category_topping ct ON t.topping_id = ct.topping_id
                WHERE ct.category_id = ?
            `;
            
            db.query(toppingsSql, [categoryId], (err, toppingResults) => {
                if (err) return callback(err);
                
                // Kelompokkan opsi berdasarkan nama opsi (size, sugar, dll.)
                const optionsGrouped = optionResults.reduce((acc, opt) => {
                    const name = opt.option_name.toLowerCase();
                    if (!acc[name]) {
                        acc[name] = [];
                    }
                    acc[name].push({
                        value: opt.option_value,
                        price: Number(opt.extra_price)
                    });
                    return acc;
                }, {});

                // Susun struktur data akhir
                const result = {
                    item: {
                        id: menu.menu_id,
                        name: menu.menu_name,
                        price: Number(menu.price),
                        category: menu.category_name,
                        description: menu.description,
                        image: menu.image_path
                    },
                    options: optionsGrouped,
                    toppings: toppingResults.map(t => ({
                        id: t.topping_id,
                        name: t.topping_name,
                        price: Number(t.price)
                    }))
                };
                
                callback(null, result);
            });
        });
    });
  }
};