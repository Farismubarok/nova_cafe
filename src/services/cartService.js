const API_URL = 'http://localhost:5000';

export const cartService = {
  // Add item to cart
  async addToCart(userId, menuId, quantity = 1) {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, menuId, quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to add item to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Get cart items for user
  async getCartItems(userId) {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  async updateCartItem(cartItemId, quantity) {
    try {
      const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      
      if (!response.ok) throw new Error('Failed to update cart item');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  // Remove item from cart
  async removeFromCart(cartItemId) {
    try {
      const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove item from cart');
      return await response.json();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  async clearCart(userId) {
    try {
      const response = await fetch(`${API_URL}/cart/${userId}/clear`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to clear cart');
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};