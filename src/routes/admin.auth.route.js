import express from "express";
import { createAdmin, forgotPasswordForAdmin, loginForAdmin, resetPasswordAdmin, verifyOtpForAdmin, verifyOtpForForgotPasswordAdmin } from "../controllers/adminAuth.controller.js";
import verifyAdmin from "../middlewares/admin.auth.js";
const router=express.Router()

// admin auth

router.post('/create-admin',createAdmin)

router.post('/admin-login',loginForAdmin)

router.post('/verify-otp',verifyAdmin,verifyOtpForAdmin)



// Forgot Password
router.post("/forgot-password", forgotPasswordForAdmin);  

router.post("/verify-forgot-password-otp", verifyOtpForForgotPasswordAdmin); 

router.post("/reset-password", resetPasswordAdmin); 

export default router