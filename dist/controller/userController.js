"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.makeUserAdmin = exports.findUserAdmin = exports.addUser = exports.getAllUsers = void 0;
const mongodb_1 = require("mongodb");
// Get all users
const getAllUsers = async (req, res) => {
    const result = await req.db.collection("user").find({}).toArray();
    res.send(result);
};
exports.getAllUsers = getAllUsers;
// Add user
const addUser = async (req, res) => {
    const user = req.body;
    const existingUser = await req.db.collection("user").findOne({ email: user.email });
    if (existingUser) {
        return res.status(409).send({ status: 'error', message: 'User Already Exist' });
    }
    const result = await req.db.collection("user").insertOne(user);
    res.send(result);
};
exports.addUser = addUser;
// Find user admin or not
const findUserAdmin = async (req, res) => {
    const email = req.params.email;
    if (email !== req.user.email) {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    const user = await req.db.collection("user").findOne({ email: email });
    const result = { admin: user?.role === 'admin' };
    res.send(result);
};
exports.findUserAdmin = findUserAdmin;
// Make user admin
const makeUserAdmin = async (req, res) => {
    const id = req.params.id;
    const result = await req.db.collection("user").updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { role: 'admin' } });
    res.send(result);
};
exports.makeUserAdmin = makeUserAdmin;
// Delete user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const result = await req.db.collection("user").deleteOne({ _id: new mongodb_1.ObjectId(id) });
    res.send(result);
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map