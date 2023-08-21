import { Request, Response, NextFunction } from 'express';

export const verifyAdmin = async (req:Request, res:Response, next:NextFunction) => {
    const email = (req as any).user.email;
    const query = { email: email };
    const user = await (req as any).db.collection("user").findOne(query);
    if (user?.role !== 'admin') {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    next();
}