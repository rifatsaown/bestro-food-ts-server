/* --------------------------------------------------------------
    This middleware is used to connect to the database and attach the database instance to the request object so that it can be accessed from the controllers directly without having to import the database instance in each controller.
-----------------------------------------------------------------------------------------*/

import { getDbConnection } from "../utils/dbConnect";
import { Request, Response, NextFunction } from "express";

export const dbInstance = async (req: Request , res: Response, next: NextFunction) => {
    try {
        
        const database = getDbConnection(); // Access the database instance directly from the request object
        (req as any).db = database; // Attach the database instance to the request object and (req as any) is used to avoid typescript error
        next();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send({ status: 'error', message: 'Server Error' });
    }
}