"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnection = exports.connectToDatabase = void 0;
require("dotenv/config");
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI;
let dbConnection = null; // connection to the database is stored here once it is established the first time 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const connectToDatabase = async () => {
    if (dbConnection)
        return;
    try {
        await client.connect();
        dbConnection = client.db(process.env.DB_NAME);
        console.log("Connected successfully to Database");
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectToDatabase = connectToDatabase;
// get the connection to the database 
const getDbConnection = () => {
    return dbConnection;
};
exports.getDbConnection = getDbConnection;
//# sourceMappingURL=dbConnect.js.map