import { Op } from "sequelize";
import stagingModel from "../models/staging.model.js";

export const createStaging=async(req,res)=>{
    try {
        const {stagingName}=req.body;
        if(!stagingName || stagingName.trim() == ''){
            return res.status(400).json({message:'Staging Name is required'});        
        }
        const checkExistence=await stagingModel.findOne({where:{stagingName}});
        if(checkExistence){
            return res.status(402).json({message:'Staging already exists'});
        }
        const staging=await stagingModel.create({stagingName});
        res.status(201).json({message:'Staging Created Successfully'});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const getStaging = async (req, res) => {
    try {
        const { name } = req.query;

        const staging = await stagingModel.findAll({
            where: {
                stagingName: {
                    [Op.like]: `%${name}%`, 
                },
            },
        });

        res.status(200).json({ message: "success", staging });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid Request" });
    }
};

export const deleteStaging = async (req, res) => {
    try {
        const { stagingId } = req.params;
        if (!stagingId || stagingId== "") {
            return res.status(400).json({ message: "Staging ID is required" });
        }
        const checkExistence = await stagingModel.findOne({ where: { id: stagingId } });
        if (!checkExistence) {
            return res.status(404).json({ message: "Staging not found" });
        }
        await stagingModel.destroy({ where: { id: stagingId } });
        res.status(200).json({ message: "Staging Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid Request", error: error.message });
    }
}

export const updateStaging = async (req, res) => {
    try {
        const { stagingId } = req.params;
        const {stagingName}=req.body;
        if (!stagingId || stagingId== "") {
            return res.status(400).json({ message: "Staging ID is required" });
        }
        if(!stagingName || stagingName.trim() == ''){
            return res.status(400).json({message:'Staging Name is required'});        
        }   
        const checkExistence = await stagingModel.findOne({ where: { id: stagingId } });
        if (!checkExistence) {
            return res.status(404).json({ message: "Staging not found" });
        }
        await stagingModel.update(stagingName, { where: { id: stagingId } });
        res.status(200).json({ message: "Staging Updated Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Invalid Request", error: error.message });
    }
}