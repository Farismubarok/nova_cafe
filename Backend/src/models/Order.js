// Backend/src/models/OrderModel.js

import { db } from "../config/db.js";

// Helper untuk menjalankan query dalam promise
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const Order = {
    /**
     * Menyimpan seluruh pesanan (Order, Order_Detail, Options, Toppings) sebagai satu transaksi.
     */
    createOrder: async (orderData, userId, paymentMethod) => {
        const { finalTotal, items } = orderData;

        try {
            // 1. Mulai Transaksi
            await query("START TRANSACTION");
            
            // 2. Insert ke Tabel `order`
            const orderSql = 
                "INSERT INTO `order` (user_id, total_price, status, payment_method) VALUES (?, ?, 'paid', ?)";
            const orderResult = await query(orderSql, [userId, finalTotal, paymentMethod]);
            const orderId = orderResult.insertId;

            // 3. Loop dan Insert ke Tabel `order_detail`
            for (const item of items) {
                const detailSql = 
                    "INSERT INTO order_detail (order_id, menu_id, quantity, base_price, total_price) VALUES (?, ?, ?, ?, ?)";
                
                const basePrice = item.price; 
                const detailResult = await query(detailSql, [orderId, item.id, item.quantity, basePrice, item.totalPrice]);
                const orderDetailId = detailResult.insertId;
                
                // 4. Insert ke Tabel `order_option` (Size, Sugar, Ice, Portion)
                const optionNames = Object.keys(item).filter(key => 
                    !['key', 'id', 'name', 'img', 'price', 'quantity', 'toppings', 'notes', 'totalPrice', 'category'].includes(key)
                );

                for (const name of optionNames) {
                    const optionSql = 
                        "INSERT INTO order_option (order_detail_id, option_name, option_value) VALUES (?, ?, ?)";
                    await query(optionSql, [orderDetailId, name, item[name]]);
                }
                
                // 5. Insert ke Tabel `order_topping`
                if (item.toppings && item.toppings.length > 0) {
                    for (const toppingName of item.toppings) {
                        // Ambil topping_id berdasarkan nama topping
                        const toppingData = await query("SELECT topping_id FROM toppings WHERE topping_name = ? LIMIT 1", [toppingName]);
                        if (toppingData.length > 0) {
                             const toppingId = toppingData[0].topping_id;
                             const toppingSql = 
                                 "INSERT INTO order_topping (order_detail_id, topping_id) VALUES (?, ?)";
                             await query(toppingSql, [orderDetailId, toppingId]);
                        }
                    }
                }
            }

            // 6. Commit Transaksi
            await query("COMMIT");
            return orderId;

        } catch (error) {
            // Rollback jika terjadi kesalahan
            await query("ROLLBACK");
            throw error;
        }
    }
};