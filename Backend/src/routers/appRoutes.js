import express from 'express';
import { getDashboardStats } from '../controller/appController.js';

const router = express.Router();

// Route untuk mendapatkan statistik dashboard (Total Pendapatan, Total Order, Total User)
router.get('/stats', getDashboardStats);

export default router;