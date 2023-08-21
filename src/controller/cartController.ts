import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

// Get all carts items of user by email
export const getCart = async (req: Request, res: Response) => {
    const email = req.query.email;
    if (email !== (req as any).user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    };
    if (!email) { res.send([])}
    const result = await (req as any).db.collection("carts").find({ userEmail: email }).toArray();
    res.send(result);
}

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
    const item = req.body;
    const result = await (req as any).db.collection("carts").insertOne(item);
    res.send(result);
}

// Delete item from cart
export const deleteItemFromCart = async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await (req as any).db.collection("carts").deleteOne({ _id: new ObjectId(id) });
    res.send(result);
}