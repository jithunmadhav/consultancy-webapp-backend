import express from "express";
import { clientForgotPassword, clientLogin, clientResetPassword, verifyOtpForClient, verifyOtpForClientForgotPassword } from "../controllers/clientAuth.controller.js";
const router = express.Router();

// Client login and OTP verification
router.post("/login", clientLogin); 

router.post("/verify-otp", verifyOtpForClient);  

// Forgot Password
router.post("/forgot-password", clientForgotPassword);  

router.post("/verify-forgot-password-otp", verifyOtpForClientForgotPassword); 

router.post("/reset-password", clientResetPassword);  




export default router