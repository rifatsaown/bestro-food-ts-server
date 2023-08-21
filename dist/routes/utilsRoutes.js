"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const verifyJWT_1 = require("../middleware/verifyJWT");
const Stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY);
const router = express_1.default.Router();
// Get All the reviews
router.get('/reviews', async (req, res) => {
    const result = await req.db.collection("reviews").find({}).toArray();
    res.send(result);
});
// create payment intent
router.post('/create-payment-intent', verifyJWT_1.verifyJwt, async (req, res) => {
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
    });
});
// payment releted api
router.post('/payment', verifyJWT_1.verifyJwt, async (req, res) => {
    const payment = req.body;
    const result = await req.db.collection("payments").insertOne(payment);
    const query = { _id: { $in: payment.cartItems.map((id) => new mongodb_1.ObjectId(id)) } };
    // const query = { userEmail: payment.email }; // delete all cart item of user
    const deleteResult = await req.db?.collection("carts").deleteMany(query);
    res.send({ result, deleteResult });
});
// Get all payments
router.get('/payments', verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, async (req, res) => {
    const result = await req.db.collection("payments").find({}).toArray();
    res.send(result);
});
// Get all payments by user email
router.get('/payments/:email', verifyJWT_1.verifyJwt, async (req, res) => {
    const email = req.params.email;
    if (email !== req.user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    ;
    const result = await req.db.collection("payments").find({ email: email }).toArray();
    res.send(result);
});
// Aprove payment
router.patch('/payments/:id', verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const result = await req.db.collection("payments").updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { orderStatus: 'approved' } });
    res.send(result);
});
exports.default = router;
//# sourceMappingURL=utilsRoutes.js.map