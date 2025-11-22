import { db } from '../config/db.js';

// Get User Profile
export const getUserProfile = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT user_id, name, email, phone, role, created_at FROM users WHERE user_id = ?";
    
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        
        res.json(results[0]);
    });
};

// Update User Profile
export const updateUserProfile = (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body; // Bisa tambahkan field lain jika perlu

    const sql = "UPDATE users SET name = ?, phone = ? WHERE user_id = ?";
    
    db.query(sql, [name, phone, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        
        res.json({ message: "Profile updated successfully", name, phone });
    });
};

// Get All Users (For Admin)
export const getAllUsers = (req, res) => {
    const sql = "SELECT user_id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC";
    
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.json(results);
    });
};

// Delete User
export const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE user_id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.json({ message: "User deleted successfully" });
    });
};