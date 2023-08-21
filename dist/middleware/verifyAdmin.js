"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const verifyAdmin = async (req, res, next) => {
    const email = req.user.email;
    const query = { email: email };
    const user = await req.db.collection("user").findOne(query);
    if (user?.role !== 'admin') {
        return res.status(403).send({ status: 'error', message: 'Forbiden Access' });
    }
    next();
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=verifyAdmin.js.map