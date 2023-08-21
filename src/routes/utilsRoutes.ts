import express from 'express';
import { verifyJwt } from '../middleware/verifyJWT';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';
import { ObjectIdLike } from 'bson';

const router = express.Router();

// Get All the reviews
router.get('/reviews', async (req, res) => {
    const result = await (req as any).db.collection("reviews").find({}).toArray();
    res.send(result);
})

// create payment intent
router.post('/create-payment-intent', verifyJwt, async (req, res) => {
    const { price } = req.body;
    const payAmount = parseInt(price);
    const amount = payAmount * 100;
    const paymentIntent = await (Stripe as any).paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

// payment releted api
router.post('/payment', verifyJwt, async (req, res) => {
    const payment = req.body;
    const result = await (req as any).db.collection("payments").insertOne(payment);
    const query = { _id: { $in: payment.cartItems.map((id: string | number | ObjectId | ObjectIdLike | Uint8Array) => new ObjectId(id)) } };
    // const query = { userEmail: payment.email }; // delete all cart item of user
    const deleteResult = await (req as any).collection("carts").deleteMany(query);
    res.send({ result, deleteResult });
})


export default router;