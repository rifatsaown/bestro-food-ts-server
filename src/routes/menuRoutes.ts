import express from 'express';
import { getAllMenu, addItem, deleteItem } from '../controller/menuController';
import { verifyJwt } from '../middleware/verifyJWT';
import { verifyAdmin } from '../middleware/verifyAdmin';


const router = express.Router();

//Get all menu items
router.route("/")
    .get(getAllMenu)
    .post(verifyJwt,verifyAdmin,addItem);

router.route("/:id")
    .delete(verifyJwt,verifyAdmin,deleteItem);

export default router;