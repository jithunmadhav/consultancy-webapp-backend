import candidateModel from "../models/candidate.model.js";
import skillRatingModel from "../models/skillRating.model.js";
import { validateCandidateData } from "../validators/candidate.validator.js";
import { Op } from 'sequelize';
export const createCandidate=async(req,res)=>{
    try {
        const { error,value } = validateCandidateData.validate(req.body);
        const skillRating= value.skillRating;
        if (error) {
          return res.status(400).json({
            status: 400,
            message: error.details[0].message,
          });
        }
        const checkExistence=await candidateModel.findOne({where:{email:value.email}});
        if(checkExistence){
            return res.status(402).json({message:'Candidate already exists'});
        }
        const candidate=await candidateModel.create(value);
        const skillRatingsWithCandidateId = skillRating.map(skill => ({
            ...skill,
            candidateId: candidate.id,
        }));
        const skills=await skillRatingModel.bulkCreate(skillRatingsWithCandidateId);
        res.status(201).json({message:'Candidate Created Successfully'});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}

export const blockCandidate=async(req,res)=>{
    try {
        const {candidateId}=req.params;
        const candidate=await candidateModel.findOne({where:{id:candidateId}});
        if(!candidate){
            return res.status(404).json({message:'Candidate Not Found'});
        }
        const updateCandidate=await candidateModel.update({deleted:'YES'},{where:{id:candidateId}});
        res.status(200).json({message:'Candidate blocked Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}


export const unblockCandidate=async(req,res)=>{
    try {
        const {candidateId}=req.params;
        const candidate=await candidateModel.findOne({where:{id:candidateId}});
        if(!candidate){
            return res.status(404).json({message:'Candidate Not Found'});
        }
        const updateCandidate=await candidateModel.update({deleted:'NO'},{where:{id:candidateId}});
        res.status(200).json({message:'Candidate Unblocked Successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Invalid Request'});
    }
}   

export const deleteCandidate=async(req,res)=>{
    try {
        const {candidateId}=req.params;
        const candidate=await candidateModel.findOne({where:{id:candidateId}});
        if(!candidate){
            return res.status(404).json({message:'Candidate Not Found'});
        }
        const deleteCandidate=await candidateModel.destroy({where:{id:candidateId}});
        const deleteSkillRatings=await skillRatingModel.destroy({where:{candidateId:candidateId}});
        res.status(200).json({message:'Candidate Deleted Successfully'});
        console.error(error);
    } catch (error) {
        res.status(500).json({message:'Invalid Request'});
    }
}

export const updateCandidate = async (req, res) => {
    try {
        const { candidateId } = req.params; 
        const { error, value } = validateCandidateData.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                status: 400,
                message: "Validation failed",
                errors: error.details.map((e) => e.message),
            });
        }

        // Check if candidate exists
        const candidate = await candidateModel.findByPk(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Update candidate data
        await candidate.update(value);

        res.status(200).json({
            message: "Candidate updated successfully",
            updatedData: value,
        });
    } catch (error) {
        console.error("Error updating candidate:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const listCandidates = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;

        // Build the search condition
        const searchCondition = search
            ? {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { mobile: { [Op.like]: `%${search}%` } },
                    { role: { [Op.like]: `%${search}%` } }
                ],
            }
            : {};

        // Pagination settings
        const offset = (page - 1) * limit;

        // Query the database
        const { rows, count } = await candidateModel.findAndCountAll({
            where: searchCondition,
            include: [
                {
                    model: skillRatingModel, // Include related skills if needed
                    attributes: ['name', 'rating'], // Customize as per your requirements
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']], // Sort by creation date (descending)
        });

        res.status(200).json({
            message: 'Candidates fetched successfully.',
            data: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to fetch candidates.', error: error.message });
    }
};