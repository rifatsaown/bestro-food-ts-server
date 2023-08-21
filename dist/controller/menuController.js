"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.addItem = exports.getAllMenu = void 0;
const mongodb_1 = require("mongodb");
const getAllMenu = async (req, res) => {
    const result = await req.db.collection("menu").find({}).toArray();
    res.send(result);
};
exports.getAllMenu = getAllMenu;
const addItem = async (req, res) => {
    const item = req.body;
    const result = await req.db.collection("menu").insertOne(item);
    res.send(result);
};
exports.addItem = addItem;
const deleteItem = async (req, res) => {
    const id = req.params.id;
    const result = await req.db.collection("menu").deleteOne({ _id: new mongodb_1.ObjectId(id) });
    res.send(result);
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=menuController.js.map