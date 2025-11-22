import { db } from "../config/db.js";

// Get favorites for a specific user
export const getFavorites = (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: "userId required" });

  const sql = `
    SELECT m.menu_id, m.menu_name, m.description, m.image_path, m.price
    FROM menu m
    JOIN user_fav uf ON m.menu_id = uf.menu_id
    WHERE uf.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    // Map columns to the frontend-friendly shape
    const items = results.map(r => ({
      id: r.menu_id,
      name: r.menu_name,
      description: r.description,
      image: r.image_path,
      price: r.price
    }));
    res.json(items);
  });
};

// Add favorite (body: { user_id, menu_id })
export const addFavorite = (req, res) => {
  const { user_id, menu_id } = req.body;
  if (!user_id || !menu_id) return res.status(400).json({ message: "user_id and menu_id required" });

  const sql = `INSERT IGNORE INTO user_fav (user_id, menu_id) VALUES (?, ?)`;
  db.query(sql, [user_id, menu_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "added", affectedRows: result.affectedRows });
  });
};

// Remove favorite (route: /:userId/:menuId)
export const removeFavorite = (req, res) => {
  const { userId, menuId } = req.params;
  if (!userId || !menuId) return res.status(400).json({ message: "userId and menuId required" });

  const sql = `DELETE FROM user_fav WHERE user_id = ? AND menu_id = ?`;
  db.query(sql, [userId, menuId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "deleted", affectedRows: result.affectedRows });
  });
};
