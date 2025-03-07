import programmingSkillsModel from "../models/programmingSkills.model.js";

export const addProgrammingSkill = async (req, res) => {
    try {
        const { skill } = req.body;  

        if (!Array.isArray(skill) || skill.length === 0) {
            return res.status(400).json({ message: 'Skill list must be a non-empty array.' });
        }

         
        const existingSkills = await programmingSkillsModel.findAll({
            where: { name: skill },
            attributes: ['name'],
        });

       
        const existingSkillNames = existingSkills.map(skill => skill.name);

         
        const newSkills = skill.filter(skillName => !existingSkillNames.includes(skillName));

        if (newSkills.length === 0) {
            return res.status(402).json({ message: 'All programming skills already exist.' });
        }

        
        const skillsToCreate = newSkills.map(skillName => ({ name: skillName }));
        await programmingSkillsModel.bulkCreate(skillsToCreate);

        res.status(201).json({ message: 'Programming Skills Added Successfully', newSkills });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid Request', error: error.message });
    }
};

export const getProgrammingSkills = async (req, res) => {
    try {
        const skills = await programmingSkillsModel.findAll();
        res.status(200).json({message:'success',skills});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid Request', error: error.message });
    }
};

export const deleteProgrammingSkill = async (req, res) => {
    try {
        const { skillId } = req.params;
        await programmingSkillsModel.destroy({ where: { id: skillId } });
        res.status(200).json({ message: 'Programming Skill Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid Request', error: error.message });
    }
};