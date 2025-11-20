// Backend/src/models/UserModel.js
import { db } from "../config/db.js";

export const UserModel = {
    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], callback);
    },

    create: (userData, callback) => {
        const { name, email, password, phone } = userData;
        const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, password, phone], callback);
    }
};