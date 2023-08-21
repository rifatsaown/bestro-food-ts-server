"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controller/cartController");
const verifyJWT_1 = require("../middleware/verifyJWT");
const router = express_1.default.Router();
router.route("/")
    // Get all carts items of user by email
    .get(verifyJWT_1.verifyJwt, cartController_1.getCart)
    // Add item to cart
    .post(verifyJWT_1.verifyJwt, cartController_1.addItemToCart);
// Delete item from cart
router.route("/:id")
    .delete(verifyJWT_1.verifyJwt, cartController_1.deleteItemFromCart);
exports.default = router;
//# sourceMappingURL=cartsRoutes.js.map