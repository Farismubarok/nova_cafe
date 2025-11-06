import { Menu } from "../models/Menu.js";

// Get all menu items
export const getAllMenus = (req, res) => {
  Menu.getAll((err, results) => {
    if (err) {
      console.error("Error fetching menus:", err);
      return res.status(500).json({ message: "Error fetching menus", error: err });
    }
    res.json(results);
  });
};

// Get single menu item
export const getMenuById = (req, res) => {
  const { id } = req.params;
  Menu.getById(id, (err, results) => {
    if (err) {
      console.error("Error fetching menu:", err);
      return res.status(500).json({ message: "Error fetching menu", error: err });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json(results[0]);
  });
};

// Create new menu item
export const createMenu = (req, res) => {
  const menuData = req.body;
  Menu.create(menuData, (err, result) => {
    if (err) {
      console.error("Error creating menu:", err);
      return res.status(500).json({ message: "Error creating menu", error: err });
    }
    res.status(201).json({
      message: "Menu created successfully",
      id: result.insertId
    });
  });
};

// Update menu item
export const updateMenu = (req, res) => {
  const { id } = req.params;
  const menuData = req.body;
  Menu.update(id, menuData, (err, result) => {
    if (err) {
      console.error("Error updating menu:", err);
      return res.status(500).json({ message: "Error updating menu", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu updated successfully" });
  });
};

// Delete menu item
export const deleteMenu = (req, res) => {
  const { id } = req.params;
  Menu.delete(id, (err, result) => {
    if (err) {
      console.error("Error deleting menu:", err);
      return res.status(500).json({ message: "Error deleting menu", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu deleted successfully" });
  });
};