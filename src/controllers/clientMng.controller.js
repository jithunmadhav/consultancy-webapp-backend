import clientModel from "../models/client.model.js";
import { sendEmail } from "../utils/email.utils.js";
import { accountCreationEmail } from "../utils/message.template.utils.js";
import { randomId } from "../utils/randomNum.utils.js";
import { createClientValidation, updateClientValidation } from "../validators/client.validator.js";


export const createClient=async(req,res)=>{
    try {
        const { error } = createClientValidation.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const {username,email,password,companyName,mobile,clientType}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkExcistence=await clientModel.findOne({where:{email}});
        const clientId=randomId();
        if(checkExcistence){
            return res.status(402).json({message:'client already exists'});
        }

        const client=await clientModel.create({username,email,password:hashedPassword,companyName,mobile,clientType,clientId});

        const clientName =username;
        const emailBody = accountCreationEmail(clientName, email, password);
        const subject=`Account Creation Successful – Login to Your Dashboard`
        sendEmail(email,emailBody,subject)
        res.status(201).json({message:'Client Created Successfully'});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const banClient=async(req,res)=>{
    try {
        const {clientId}=req.params;
        const client=await clientModel.findOne({where:{id:clientId}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const updateClient=await clientModel.update({banned:'YES'},{where:{id:clientId}});
        res.status(200).json({message:'Client Banned Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const unbanClient=async(req,res)=>{
    try {
        const {clientId}=req.params;
        const client=await clientModel.findOne({where:{id:clientId}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const updateClient=await clientModel.update({banned:'NO'},{where:{id:clientId}});
        res.status(200).json({message:'Client Unbanned Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const getClients=async(req,res)=>{
    try {
        const client=await clientModel.findAll({where:{banned:'NO'},attributes: { exclude: ['password'] },});
        res.status(200).json({client});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const listBannedClients=async(req,res)=>{
    try {
        const client=await clientModel.findAll({where:{banned:'YES'},attributes: { exclude: ['password'] },});
        res.status(200).json({client});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const updateClient=async(req,res)=>{
    try {
        const {clientId}=req.params;
        const {error}=updateClientValidation.validate(req.body);
        if(error){
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
              });
        }
        const {username,companyName,mobile,clientType}=req.body;
        const client=await clientModel.findOne({where:{id:clientId}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const updateClient=await clientModel.update({username,companyName,mobile,clientType},{where:{id:clientId}});
        res.status(200).json({message:'Client Updated Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const deleteClient=async(req,res)=>{
    try {
        const {clientId}=req.params;
        const client=await clientModel.findOne({where:{id:clientId}});
        if(!client){
            return res.status(404).json({message:'Client Not Found'});
        }
        const deleteClient=await clientModel.destroy({where:{id:clientId}});
        res.status(200).json({message:'Client Deleted Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}