import express from 'express';
import { 
    getUserProfile, 
    updateUserProfile, 
    getAllUsers, 
    deleteUser 
} from '../controller/userController.js';

const router = express.Router();

// Ambil data profile user berdasarkan ID
router.get('/profile/:id', getUserProfile);

// Update data profile user
router.put('/profile/:id', updateUserProfile);

// --- Admin Routes ---
// Ambil semua user (biasanya untuk halaman Customer di Admin)
router.get('/', getAllUsers);

// Hapus user (Opsional, untuk admin)
router.delete('/:id', deleteUser);

export default router;