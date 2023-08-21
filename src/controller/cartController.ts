import { Request, Response } from 'express';

export const getCart = async (req: Request, res: Response) => {
    const email = req.query.email;
    if (email !== (req as any).user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    };
    if (!email) { res.send([])}
    const result = await (req as any).db.collection("carts").find({ userEmail: email }).toArray();
    res.send(result);
}