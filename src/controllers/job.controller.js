
import jobModel from "../models/jobRequest.model.js";
import { randomId } from "../utils/randomNum.utils.js";
import { createJobValidation } from "../validators/job.validator.js";

export const createJob=async(req,res)=>{
    try {
        const { error,value } = createJobValidation.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const jobId=randomId();
        value.jobId=jobId;
        const existingJob = await jobModel.findOne({
            where: {
              clientId: value.clientId,
              jobTitle: value.jobTitle,
              deleted: 'NO',
            },
          });
        if(existingJob){
            return res.status(402).json({message:'Job already exists'});
        }
        const job=await jobModel.create(value);
        res.status(201).json({message:'Job Created Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }    
}

export const getJobs=async(req,res)=>{
    try {
        const jobs=await jobModel.findAll({where:{clientId:req.clientId,deleted:'NO'}});
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }    
}   

export const makeJobToInactive=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const job=await jobModel.findOne({where:{id:jobId,clientId:req.clientId}});
        if(!job){
            return res.status(404).json({message:'Job Not Found'});
        }

        const updateJob=await jobModel.update({deleted:'YES'},{where:{id:jobId}});
        res.status(200).json({message:'Job made to inactive'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const makeJobToActive=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const job=await jobModel.findOne({where:{id:jobId,clientId:req.clientId}});
        if(!job){
            return res.status(404).json({message:'Job Not Found'});
        }
        const updateJob=await jobModel.update({deleted:'NO'},{where:{id:jobId}});
        res.status(200).json({message:'Job made to active'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const updateJob=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const {error,value}=createJobValidation.validate(req.body);
        if(error){
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
              });
        }
         
        const job=await jobModel.findOne({where:{id:jobId,clientId:req.clientId}});
        if(!job){
            return res.status(404).json({message:'Job Not Found'});
        }
        const updateJob=await jobModel.update({value},{where:{id:jobId}});
        res.status(200).json({message:'Job Updated Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const deleteJob=async(req,res)=>{
    try {
        const {jobId}=req.params;
        const job=await jobModel.findOne({where:{id:jobId,clientId:req.params.clientId}});
        if(!job){
            return res.status(404).json({message:'Job Not Found'});
        }
        const deleteJob=await jobModel.destroy({where:{id:jobId}});
        res.status(200).json({message:'Job Deleted Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

