-- Create menu table
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50),
  image_url VARCHAR(255),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample menu items
INSERT INTO menu (name, description, price, category, image_url) VALUES
('Café Latte', 'Espresso with steamed milk and a light layer of foam', 25000, 'Coffee', '/images/cafe-latte.jpg'),
('Cappuccino', 'Equal parts espresso, steamed milk, and milk foam', 25000, 'Coffee', '/images/cappuccino.jpg'),
('Croissant', 'Buttery, flaky pastry', 15000, 'Pastry', '/images/croissant.jpg'),
('Club Sandwich', 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', 35000, 'Food', '/images/club-sandwich.jpg');