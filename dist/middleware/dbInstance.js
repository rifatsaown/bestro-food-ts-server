"use strict";
/* --------------------------------------------------------------
    This middleware is used to connect to the database and attach the database instance to the request object so that it can be accessed from the controllers directly without having to import the database instance in each controller.
-----------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInstance = void 0;
const dbConnect_1 = require("../utils/dbConnect");
const dbInstance = async (req, res, next) => {
    try {
        const database = (0, dbConnect_1.getDbConnection)(); // Access the database instance directly from the request object
        req.db = database; // Attach the database instance to the request object and (req as any) is used to avoid typescript error
        next();
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send({ status: 'error', message: 'Server Error' });
    }
};
exports.dbInstance = dbInstance;
//# sourceMappingURL=dbInstance.js.map