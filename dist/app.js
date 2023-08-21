"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dbInstance_1 = require("./middleware/dbInstance");
const app = (0, express_1.default)();
/*------------ Middlewares --------------*/
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(dbInstance_1.dbInstance);
/*------------ Home Routes --------------*/
app.get("/", (req, res) => {
    const filePath = fs_1.default.readFileSync(path_1.default.join(__dirname, "../public/index.html"), "utf8");
    res.send(filePath);
});
/*------------ JWT Routes --------------*/
app.post('/jwt', (req, res) => {
    const user = req.body;
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    res.send({ token });
});
/*----------- Import all Routes ------------*/
const cartsRoutes_1 = __importDefault(require("./routes/cartsRoutes"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const utilsRoutes_1 = __importDefault(require("./routes/utilsRoutes"));
/*--------------- Route MiddleWare ---------------*/
app.use('/menu', menuRoutes_1.default);
app.use('/users', usersRoutes_1.default);
app.use('/carts', cartsRoutes_1.default);
app.use('/', utilsRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map