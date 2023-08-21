"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ status: 'error', message: 'Unauthorized Access' });
    }
    // Bearer token cut from header
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ status: 'error', message: 'Unauthorized Access' });
        }
        req.user = user;
        next();
    });
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=verifyJWT.js.map