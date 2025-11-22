import { db } from "../config/db.js";

// Note: For simplicity these handlers do not hash passwords.
// For production, always hash passwords (bcrypt) and validate input.

export const register = (req, res) => {
	const { name, email, password, phone } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password required" });
	}

	const sql = `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`;
	db.query(sql, [name || null, email, password, phone || null], (err, result) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error" });
		}
		return res.status(201).json({ message: "User registered", id: result.insertId });
	});
};

export const login = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password required" });
	}

	const sql = `SELECT user_id, name, email, password, phone FROM users WHERE email = ? LIMIT 1`;
	db.query(sql, [email], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Database error" });
		}
		if (!results || results.length === 0) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const user = results[0];
		// Plain-text comparison (only for local/testing)
		if (user.password !== password) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// In production, return JWT or session. Here return basic user info.
		return res.json({ 
			id: user.user_id,  // Sesuaikan dengan nama kolom di DB
			name: user.name, 
			email: user.email,
			phone: user.phone 
		});
	});
};

