"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemFromCart = exports.addItemToCart = exports.getCart = void 0;
const mongodb_1 = require("mongodb");
// Get all carts items of user by email
const getCart = async (req, res) => {
    const email = req.query.email;
    if (email !== req.user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    ;
    if (!email) {
        res.send([]);
    }
    const result = await req.db.collection("carts").find({ userEmail: email }).toArray();
    res.send(result);
};
exports.getCart = getCart;
// Add item to cart
const addItemToCart = async (req, res) => {
    const item = req.body;
    const result = await req.db.collection("carts").insertOne(item);
    res.send(result);
};
exports.addItemToCart = addItemToCart;
// Delete item from cart
const deleteItemFromCart = async (req, res) => {
    const id = req.params.id;
    const result = await req.db.collection("carts").deleteOne({ _id: new mongodb_1.ObjectId(id) });
    res.send(result);
};
exports.deleteItemFromCart = deleteItemFromCart;
//# sourceMappingURL=cartController.js.map