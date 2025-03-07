import { clientLoginValidation } from "../validators/client.validator.js";
import clientModel from "../models/client.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomOtp } from "../utils/randomNum.utils.js";
import { forgotPasswordTextBody, otpTextBodyClient } from "../utils/message.template.utils.js";


export const clientLogin=async(req,res)=>{
    try {
        const { error } = clientLoginValidation.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const {email,password}=req.body;
        const client=await clientModel.findOne({where:{email}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const isPasswordValid = await bcrypt.compare(password, client.password);
        if (!isPasswordValid) {
            return res.status(401).json({message:'Invalid Password'});
        }
        
        const otp=randomOtp();
        const expiryTime = Date.now() + 5 * 60 * 1000;
        const emailBody = otpTextBodyClient(otp,client.username);
        const subject=`Your Verification Code-${otp} for login`
        sendEmail(email,emailBody,subject)
        await client.update({otp:otp,otpExpiry:expiryTime},{where:{id:client.id}});
          
        res.status(200).json({message:'Client Logged In Successfully',email:client.email});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
};

export const verifyOtpForClient = async (req, res) => {
    try {
      const { otp,email} = req.body;
      const client = await clientModel.findOne({where:{email:email },attributes: { exclude: ['password'] },});
  
      if (client?.otp !== otp) {
        return res.status(400).json({
          status: 400,
          message: "Invalid otp",
        });
      }
      if (Date.now() > new Date(client.otpExpiry).getTime()) {
        return res.status(400).json({
            status: 400,
            message: "OTP expired",
          });      }
 
  
          const token = jwt.sign({ clientId: client.id }, process.env.CLIENT_TOKEN_KEY, {
              expiresIn: "30d",
            });
            await client.update({token:token,otpExpiry:null,otp:null},{where:{id:client.id}});
   
      res.status(200).json({
        status: 200,
        message: "OTP verified successfully",
        token: token,
        client: client,
      });
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
};

export const clientForgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const client=await clientModel.findOne({where:{email}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const otp=randomOtp()
        expiryTime = Date.now() + 5 * 60 * 1000;
        const emailBody = forgotPasswordTextBody(otp,client.username);
        const subject=`Reset Your Password - Verification Code`
        sendEmail(email,emailBody,subject)
        await clientModel.update({otp:otp,otpExpiry:expiryTime},{where:{id:client.id}});
        res.status(200).json({message:'Otp Sent Successfully',email:client.email});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
};
export const verifyOtpForClientForgotPassword = async (req, res) => {
    try {
      const { otp,email} = req.body;
      const client = await clientModel.findOne({where:{email:email },attributes: { exclude: ['password'] },});
  
      if (client?.otp !== otp) {
        return res.status(400).json({
          status: 400,
          message: "Invalid otp",
        });
      }
      if (Date.now() > new Date(client.otpExpiry).getTime()) {
        return res.status(400).json({
            status: 400,
            message: "OTP expired",
          });      }
 
       await clientModel.update({token:token,otpExpiry:null,otp:null},{where:{id:client.id}});
   
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

export const clientResetPassword=async(req,res)=>{
    try {
        const {newPassword,confirmPassword,email}=req.body;
        const client=await clientModel.findOne({where:{email:email}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        if(newPassword!==confirmPassword){
            return res.status(404).json({message:'Password Not Matched'});
        }
        const isPreviousPassword = await bcrypt.compare(password, client.password);
        if (isPreviousPassword) {
            return res.status(401).json({message:'Previous Password cannot be used'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await clientModel.update({password:hashedPassword},{where:{id:client.id}});
        res.status(200).json({message:'Password Reset Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
};