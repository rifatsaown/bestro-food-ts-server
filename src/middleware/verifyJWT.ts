import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ status: 'error', message: 'Unauthorized Access' });
    }
    // Bearer token cut from header
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ status: 'error', message: 'Unauthorized Access' });
        }
        (req as any).user = user;
        next();
    })
}