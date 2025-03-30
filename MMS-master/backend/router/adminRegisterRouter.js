import express from "express";
import { adminSignIn } from "../controllers/usersController.js";
import { adminRegister } from "../controllers/adminRegisterController.js";
 // Import the controller function for getting admin profile.
//import { verifyToken} from "../middlewares/errorHandler.js";

const router = express.Router();


router.post('/signin', adminSignIn);
router.post('/admin', adminRegister);
// router.get('/profile', getAdminProfile); // Apply token verification middleware for all routes after this line.

export default router;

