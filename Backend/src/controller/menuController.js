import { Menu } from "../models/Menu.js";
import { MenuCategory } from "../models/MenuCategory.js";

// Get all menu items with categories
export const getAllMenus = (req, res) => {
  Menu.getAll((err, results) => {
    if (err) {
      console.error("Error fetching menus:", err);
      return res.status(500).json({ message: "Error fetching menus", error: err });
    }
    
    // Group items by category
    const menuByCategory = results.reduce((acc, item) => {
      const category = {
        id: item.category_id,
        name: item.category_name
      };
      
      const menuItem = {
        id: item.menu_id,
        name: item.menu_name,
        description: item.description,
        price: item.price,
        image: item.image_path
      };

      if (!acc[category.id]) {
        acc[category.id] = {
          category: category,
          items: []
        };
      }
      
      acc[category.id].items.push(menuItem);
      return acc;
    }, {});

    res.json(Object.values(menuByCategory));
  });
};

// Get menu items by category
export const getMenusByCategory = (req, res) => {
  const { categoryId } = req.params;
  Menu.getByCategory(categoryId, (err, results) => {
    if (err) {
      console.error("Error fetching menu by category:", err);
      return res.status(500).json({ message: "Error fetching menu items", error: err });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No menu items found in this category" });
    }
    res.json(results);
  });
};

// Get all categories
export const getAllCategories = (req, res) => {
  MenuCategory.getAll((err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ message: "Error fetching categories", error: err });
    }
    res.json(results);
  });
};

// Get single menu item with category
export const getMenuById = (req, res) => {
  const { menuId } = req.params;
  Menu.getById(menuId, (err, results) => {
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
  const { category_id, menu_name, description, price, image_path } = req.body;
  
  // Validate required fields
  if (!category_id || !menu_name || !price) {
    return res.status(400).json({ 
      message: "Category ID, menu name, and price are required" 
    });
  }

  const menuData = {
    category_id,
    menu_name,
    description: description || null,
    price,
    image_path: image_path || null
  };

  Menu.create(menuData, (err, result) => {
    if (err) {
      console.error("Error creating menu:", err);
      return res.status(500).json({ message: "Error creating menu", error: err });
    }
    res.status(201).json({
      message: "Menu created successfully",
      menuId: result.insertId
    });
  });
};

// Update menu item
export const updateMenu = (req, res) => {
  const { menuId } = req.params;
  const updateData = req.body;

  Menu.update(menuId, updateData, (err, result) => {
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
  const { menuId } = req.params;
  Menu.delete(menuId, (err, result) => {
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