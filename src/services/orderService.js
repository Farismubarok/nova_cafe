// src/services/orderService.js

const API_URL = 'http://localhost:5000';

export const orderService = {
    async createOrder(orderDetails, paymentMethod) {
        // userId harusnya diambil dari AuthContext, tapi untuk demo kita ambil dari login.jsx (user id 1)
        const userId = JSON.parse(localStorage.getItem('user'))?.id || 1; 

        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Anda mungkin perlu Token Autorisasi di sini:
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userId,
                paymentMethod,
                orderDetails // Berisi finalTotal, items, dll.
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to place order');
        }

        return await response.json();
    }
};