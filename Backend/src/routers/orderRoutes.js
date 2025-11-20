// Backend/src/routers/orderRoutes.js

import express from "express";
import { createNewOrder } from "../controller/orderController.js";

const router = express.Router();

// POST /orders - Simpan pesanan baru
router.post("/", createNewOrder);

// GET /orders/user/:userId - get paid orders for a user
import { getUserPaidOrders } from "../controller/orderController.js";
router.get('/user/:userId', getUserPaidOrders);

export default router;