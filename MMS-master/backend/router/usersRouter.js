import express from "express";
import { studentSignIn, teacherSignIn, getAdminProfile, adminSignIn } from "../controllers/usersController.js";
import { adminRegister } from "../controllers/adminRegisterController.js";
//import { adminSignIn } from "../controllers/adminLoginController.js";

const router = express.Router();

router.post('/student/signin', studentSignIn);
router.post('/teacher/signin', teacherSignIn);

router.post("/admin/signin", adminSignIn);

router.post('/admin/register', adminRegister);
router.get('/admin/profile', getAdminProfile); 

export default router;

