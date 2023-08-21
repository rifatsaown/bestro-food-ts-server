import express from 'express';
import { verifyAdmin } from '../middleware/verifyAdmin';
import { verifyJwt } from '../middleware/verifyJWT';
import { getAllUsers , addUser, findUserAdmin, makeUserAdmin, deleteUser} from '../controller/userController';

const router = express.Router();

//Get all users
router.route("/")
    .get(verifyJwt, verifyAdmin , getAllUsers)
    .post(verifyJwt,verifyAdmin,addUser)

/*-----Admin Routes ------*/
// Find user admin or not
router.get("/admin/:email", verifyJwt , findUserAdmin)

// Make user admin
router.patch("/admin/:id", verifyJwt , verifyAdmin ,makeUserAdmin)

// Delete user
router.delete("/:id", verifyJwt , verifyAdmin ,deleteUser)


export default router;