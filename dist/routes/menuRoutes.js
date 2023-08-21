"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuController_1 = require("../controller/menuController");
const verifyJWT_1 = require("../middleware/verifyJWT");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const router = express_1.default.Router();
//Get all menu items
router.route("/")
    .get(menuController_1.getAllMenu)
    .post(verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, menuController_1.addItem);
router.route("/:id")
    .delete(verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, menuController_1.deleteItem);
exports.default = router;
//# sourceMappingURL=menuRoutes.js.map