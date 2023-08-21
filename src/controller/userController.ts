import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

// Get all users
export const getAllUsers = async (req:Request, res:Response) =>  {
    const result = await (req as any).db.collection("user").find({}).toArray();
    res.send(result);
}

// Add user
export const addUser = async (req:Request, res:Response) => {
    const user = req.body;
    const existingUser = await (req as any).db.collection("user").findOne({ email: user.email });
    if (existingUser) {
        return res.status(409).send({ status: 'error', message: 'User Already Exist' });
    }
    const result = await (req as any).db.collection("user").insertOne(user);
    res.send(result);
}

// Find user admin or not
export const findUserAdmin = async (req:Request, res:Response) => {
    const email = req.params.email;
    if(email !== (req as any).user.email){
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    const user = await (req as any).db.collection("user").findOne({ email: email });
    const result = { admin: user?.role === 'admin' };
    res.send(result);
}

// Make user admin
export const makeUserAdmin = async (req:Request, res:Response) => {
    const id = req.params.id;
    const result = await (req as any).db.collection("user").updateOne({ _id: new ObjectId(id) }, { $set: { role: 'admin' } });
    res.send(result);
}

// Delete user
export const deleteUser = async (req:Request, res:Response) => {
    const id = req.params.id;
    const result = await (req as any).db.collection("user").deleteOne({ _id: new ObjectId(id) });
    res.send(result);
}