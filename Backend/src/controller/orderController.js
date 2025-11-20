// Backend/src/controller/orderController.js

import { Order } from "../models/Order.js"; // 💡 IMPORT ORDER MODEL
// Import lain yang mungkin diperlukan
// import { db } from "../config/db.js";
// Backend/src/controller/orderController.js
import { db } from "../config/db.js";

// Ambil SEMUA order (untuk Admin Dashboard)
export const getAllOrders = (req, res) => {
    const sql = `
        SELECT o.order_id, u.name as customer_name, o.total_price, o.status, o.created_at
        FROM \`order\` o
        LEFT JOIN users u ON o.user_id = u.user_id
        ORDER BY o.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal ambil data order" });
        res.json(results);
    });
};

// ... (fungsi createNewOrder yang sudah ada sebelumnya)
export const createNewOrder = async (req, res) => {
    // 💡 ASUMSI: Untuk sementara, kita pakai ID user 1 jika tidak ada mekanisme otentikasi
    const userId = 1; // Ganti dengan logika pengambilan user ID yang sebenarnya (dari session/token)

    const { orderDetails, paymentMethod } = req.body;
    
    if (!orderDetails || !orderDetails.items || !paymentMethod) {
        return res.status(400).json({ message: "Invalid order data received" });
    }

    try {
        const newOrderId = await Order.createOrder(orderDetails, userId, paymentMethod);
        
        res.status(201).json({ 
            message: "Order placed successfully",
            orderId: newOrderId 
        });

    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ message: "Failed to process order", error: error.message });
    }


};