import adminModel from "../models/admin.model.js";
import db from "../models/index.js";
import { sendEmail } from "../utils/email.utils.js";
import { forgotPasswordTextBody, otpTextBody } from "../utils/message.template.utils.js";
import { randomOtp } from "../utils/randomNum.utils.js";
import { adminLoginValidation, createAdminValidation } from "../validators/admin.auth.validator.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const {adminLogin}= db;

export const createAdmin=async(req,res)=>{
    try {
        const { error } = createAdminValidation.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const {name,email,password}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin=await adminModel.create({name,email,password:hashedPassword});
        res.status(201).json({message:'Admin Created Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const loginForAdmin=async(req,res)=>{
    try {
        const { error } = adminLoginValidation.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const otp=randomOtp()
        const expiryTime = Date.now() + 5 * 60 * 1000;
        const {email,password}=req.body;
        const admin=await adminModel.findOne({where:{email}});
        if(!admin){
            return res.status(404).json({message:'Admin Not Found'});
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({message:'Invalid Password'});
        }
       

        const emailBody = otpTextBody(otp,admin.name);
        const subject=`Your Verification Code-${otp} for login`
        sendEmail(email,emailBody,subject)

        const updateAdmin=await adminModel.update({otp:otp,otpExpiry:expiryTime},{where:{id:admin.id}});  

        res.status(200).json({message:'Admin Logged In Successfully' ,email:admin.email});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const verifyOtpForAdmin = async (req, res) => {
  try {
    const { otp,email } = req.body;
    const admin = await adminModel.findOne({where:{email:email },attributes: { exclude: ['password'] },});

    if (admin?.otp !== otp) {
      return res.status(400).json({
        status: 400,
        message: "Invalid otp",
      });
    }
    if (Date.now() > new Date(admin.otpExpiry).getTime()) {
      return res.status(400).json({
          status: 400,
          message: "OTP expired",
        });      }
 
    await adminModel.update({otpExpiry:null,otp:null},{where:{id:admin.id}});
    const token = jwt.sign({ adminId: admin.id }, process.env.ADMIN_TOKEN_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      status: 200,
      message: "OTP verified successfully",
      token: token,
      admin: admin,
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const forgotPasswordForAdmin=async(req,res)=>{
    try {
        const {email}=req.body;
        const admin=await adminModel.findOne({where:{email}});
        if(!admin){
            return res.status(404).json({message:'Admin Not Found'});
        }
        const otp=randomOtp();
        const expiryTime = Date.now() + 5 * 60 * 1000;
        const emailBody = forgotPasswordTextBody(otp,admin.name);
        const subject=`Reset Your Password - Verification Code`
        sendEmail(email,emailBody,subject)
        await adminModel.update({otp:otp,otpExpiry:expiryTime},{where:{id:admin.id}});
        res.status(200).json({message:'Admin Logged In Successfully' ,email:admin.email});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const verifyOtpForForgotPasswordAdmin = async (req, res) => {
  try {
    const { otp,email} = req.body;
    const admin = await adminModel.findOne({where:{email:email },attributes: { exclude: ['password'] },});

    if (admin?.otp !== otp) {
      return res.status(400).json({
        status: 400,
        message: "Invalid otp",
      });
    }
    if (Date.now() > new Date(admin.otpExpiry).getTime()) {
      return res.status(400).json({
          status: 400,
          message: "OTP expired",
        });      }

     await adminModel.update({otpExpiry:null,otp:null},{where:{id:admin.id}});
 
    res.status(200).json({
      status: 200,
      message: "OTP verified successfully",
      email: email,
    });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
};

export const resetPasswordAdmin=async(req,res)=>{
  try {
      const {newPassword,confirmPassword,email}=req.body;
      const admin=await adminModel.findOne({where:{email:email}});
      if(!admin){
          return res.status(404).json({message:'Client Not Found'});
      }
      if(newPassword!==confirmPassword){
          return res.status(404).json({message:'Password Not Matched'});
      }
      const isPreviousPassword = await bcrypt.compare(password, admin.password);
      if (isPreviousPassword) {
          return res.status(401).json({message:'Previous Password cannot be used'});
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await adminModel.update({password:hashedPassword},{where:{id:admin.id}});
      res.status(200).json({message:'Password Reset Successfully'});
  } catch (error) {
      console.error(error);
      res.status(500).json({message:'Invalid Request'});
  }
};

