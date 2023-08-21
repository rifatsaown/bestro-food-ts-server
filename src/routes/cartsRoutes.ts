import express from 'express';
import { getCart } from '../controller/cartController';
import { verifyJwt } from '../middleware/verifyJWT';

const router = express.Router();

router.route("/")
    // Get all carts items of user by email
    .get(verifyJwt, getCart)
    // Add item to cart
    .post(verifyJwt, )

export default router;