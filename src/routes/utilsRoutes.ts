import { ObjectIdLike } from 'bson';
require('dotenv').config();
import express from 'express';
import { ObjectId } from 'mongodb';
import { verifyAdmin } from '../middleware/verifyAdmin';
import { verifyJwt } from '../middleware/verifyJWT';
const Stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY);

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
    const paymentIntent = await Stripe.paymentIntents.create({
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
    const deleteResult = await (req as any).db?.collection("carts").deleteMany(query);
    res.send({ result, deleteResult });
})

// Get all payments
router.get('/payments', verifyJwt, verifyAdmin, async (req, res) => {
    const result = await (req as any).db.collection("payments").find({}).toArray();
    res.send(result);
})

// Get all payments by user email
router.get('/payments/:email', verifyJwt, async (req, res) => {
    const email = req.params.email;
    if (email !== (req as any).user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    };
    const result = await (req as any).db.collection("payments").find({ email: email }).toArray();
    res.send(result);
})

// Aprove payment
router.patch('/payments/:id', verifyJwt, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const result = await (req as any).db.collection("payments").updateOne({ _id: new ObjectId(id) }, { $set: { orderStatus: 'approved' } });
    res.send(result);
})  

export default router;