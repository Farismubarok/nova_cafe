// Backend/src/routers/orderRoutes.js

import express from "express";
import { createNewOrder } from "../controller/orderController.js";

const router = express.Router();

// POST /orders - Simpan pesanan baru
router.post("/", createNewOrder);

export default router;