import express from 'express';
import { getCart, addCartItem, removeCartItem, clearCart } from '../controller/cartController.js';

const router = express.Router();

// GET /cart/:userId
router.get('/:userId', getCart);

// POST /cart  body: { user_id, item }
router.post('/', addCartItem);

// DELETE /cart/:cartItemId
router.delete('/:cartItemId', removeCartItem);

// DELETE /cart/user/:userId  clear all
router.delete('/user/:userId', clearCart);

export default router;
