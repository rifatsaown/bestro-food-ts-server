import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const getAllMenu = async (req:Request, res:Response) => {
    const result = await (req as any).db.collection("menu").find({}).toArray();
    res.send(result);
};

export const addItem = async (req:Request, res:Response) => {
    const item = req.body;
    const result = await (req as any).db.collection("menu").insertOne(item);
    res.send(result);
};

export const deleteItem = async (req:Request, res:Response) => {
    const id = req.params.id;
    const result = await (req as any).db.collection("menu").deleteOne({ _id: new ObjectId(id) });
    res.send(result);
};