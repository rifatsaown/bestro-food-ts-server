"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const verifyJWT_1 = require("../middleware/verifyJWT");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
//Get all users
router.route("/")
    .get(verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, userController_1.getAllUsers)
    .post(userController_1.addUser);
/*-----Admin Routes ------*/
// Find user admin or not
router.get("/admin/:email", verifyJWT_1.verifyJwt, userController_1.findUserAdmin);
// Make user admin
router.patch("/admin/:id", verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, userController_1.makeUserAdmin);
// Delete user
router.delete("/:id", verifyJWT_1.verifyJwt, verifyAdmin_1.verifyAdmin, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=usersRoutes.js.map