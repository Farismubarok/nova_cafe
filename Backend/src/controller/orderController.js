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
    // Ambil userId dari body (dikirim frontend) atau dari auth (jika ada)
    const userId = req.body.userId || req.body.user_id || (req.user && req.user.id);

    const { orderDetails, paymentMethod } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "userId is required to create order" });
    }

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

// GET /orders/user/:userId  - return orders with status = 'paid' for the user
export const getUserPaidOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return res.status(400).json({ message: 'userId required' });
        // query orders table for paid orders of this user and include order details + options + toppings
        const { db } = await import("../config/db.js");
        const q = (sql, vals = []) => new Promise((resolve, reject) => {
            db.query(sql, vals, (err, rows) => err ? reject(err) : resolve(rows));
        });

        const orders = await q(
            "SELECT order_id, total_price, status, payment_method, created_at FROM `order` WHERE user_id = ? AND status = 'paid' ORDER BY created_at DESC",
            [userId]
        );

        const result = [];
        for (const o of orders) {
            const orderId = o.order_id;

            // get order detail rows and join menu to get name/image
            const details = await q(
                `SELECT od.order_detail_id, od.menu_id, od.quantity, od.base_price, od.total_price, m.menu_name AS menu_name, m.image_path AS image_path
                 FROM order_detail od
                 LEFT JOIN menu m ON od.menu_id = m.menu_id
                 WHERE od.order_id = ?`,
                [orderId]
            );

            const items = [];
            for (const d of details) {
                // options
                const optionRows = await q('SELECT option_name, option_value FROM order_option WHERE order_detail_id = ?', [d.order_detail_id]).catch(() => []);
                const options = {};
                optionRows.forEach(r => { options[r.option_name] = r.option_value; });

                // toppings
                const toppingRows = await q(
                    'SELECT t.topping_name FROM order_topping ot JOIN toppings t ON ot.topping_id = t.topping_id WHERE ot.order_detail_id = ?',
                    [d.order_detail_id]
                ).catch(() => []);
                const toppings = toppingRows.map(r => r.topping_name);

                items.push({
                    order_detail_id: d.order_detail_id,
                    id: d.menu_id,
                    name: d.menu_name || '',
                    img: d.image_path || '',
                    price: Number(d.base_price || 0),
                    quantity: d.quantity,
                    totalPrice: Number(d.total_price || 0),
                    toppings,
                    ...options
                });
            }

            result.push({
                order_id: orderId,
                total: Number(o.total_price || 0),
                status: o.status,
                payment_method: o.payment_method,
                created_at: o.created_at,
                items
            });
        }

        res.json(result);
    } catch (err) {
        console.error('getUserPaidOrders outer error', err);
        res.status(500).json({ error: err.message });
    }

};