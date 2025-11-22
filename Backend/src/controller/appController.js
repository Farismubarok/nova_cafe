import { db } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
    try {
        // Kita gunakan Promise untuk menjalankan beberapa query sekaligus
        const query = (sql) => {
            return new Promise((resolve, reject) => {
                db.query(sql, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
        };

        // 1. Hitung Total User
        const users = await query("SELECT COUNT(*) as total FROM users");
        
        // 2. Hitung Total Order
        const orders = await query("SELECT COUNT(*) as total FROM orders");
        
        // 3. Hitung Total Pendapatan (Hanya dari order yang 'completed')
        // Pastikan kolom harga di tabel orders bernama 'total_amount' atau 'total_price' (sesuaikan dengan DB Anda)
        const revenue = await query("SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'");

        res.json({
            totalUsers: users[0].total,
            totalOrders: orders[0].total,
            totalRevenue: revenue[0].total || 0
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};