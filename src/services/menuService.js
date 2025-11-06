// Base API URL - should match your backend
const API_URL = 'http://localhost:5000';

// Helper to handle common fetch options
const createRequestOptions = (method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  return options;
};

export const menuService = {
  // Get all menu items
  async getAllMenus() {
    try {
      const response = await fetch(`${API_URL}/menu`);
      if (!response.ok) throw new Error('Failed to fetch menu items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  },

  // Get single menu item by ID
  async getMenuById(id) {
    try {
      const response = await fetch(`${API_URL}/menu/${id}`);
      if (!response.ok) throw new Error('Failed to fetch menu item');
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw error;
    }
  },

  // Create new menu item
  async createMenu(menuData) {
    try {
      const response = await fetch(`${API_URL}/menu`, createRequestOptions('POST', menuData));
      if (!response.ok) throw new Error('Failed to create menu item');
      return await response.json();
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  },

  // Update menu item
  async updateMenu(id, menuData) {
    try {
      const response = await fetch(
        `${API_URL}/menu/${id}`,
        createRequestOptions('PUT', menuData)
      );
      if (!response.ok) throw new Error('Failed to update menu item');
      return await response.json();
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  },

  // Delete menu item
  async deleteMenu(id) {
    try {
      const response = await fetch(
        `${API_URL}/menu/${id}`,
        createRequestOptions('DELETE')
      );
      if (!response.ok) throw new Error('Failed to delete menu item');
      return await response.json();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }
};