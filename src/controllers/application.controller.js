import applicationsModel from "../models/applications.model.js";
import { randomId } from "../utils/randomNum.utils.js";
import { validateApplicationData } from "../validators/application.validator.js";
export const createApplication = async (req, res) => {
    try {
        const { error, value } = validateApplicationData.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message,
            });
        }
        const applicationId=randomId();
        value.applicationId=applicationId;
        const checkJobIdIsValid = await jobModel.findOne({ where: { id: value.jobId, deleted: 'NO' } });
        if (!checkJobIdIsValid) {
            return res.status(404).json({ message: 'Job Not Found' });
        }
        if (checkJobIdIsValid.expiryDate <= new Date()) {
            return res.status(404).json({ message: 'Job Expired' });
        }

        const checkClientIdIsValid = await clientModel.findOne({ where: { id: value.clientId, banned: 'NO' } });
        if (!checkClientIdIsValid) {
            return res.status(404).json({ message: 'Client Not Found' });
        }

        const checkSixMonthsCriteria = await applicationsModel.findOne({
            where: {
                jobId: value.jobId,
                email: value.email,  
                deleted: 'NO',
            },
        });
        if (checkSixMonthsCriteria) {
            const sixMonthsLater = new Date(checkSixMonthsCriteria.appliedDate);
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
            if (new Date() < sixMonthsLater) {
                return res.status(400).json({
                    status: 'error',
                    message: 'You can only re-apply 6 months after your last application.',
                });
            }
        }

        const checkDuplicateApplication = await applicationsModel.findOne({
            where: {
                jobId: value.jobId,
                clientId: value.clientId,
                email: value.email,
                mobile: value.mobile,
                deleted: 'NO',
            },
        });
        if (checkDuplicateApplication) {
            return res.status(400).json({ message: 'Application already exists' });
        }

        const application = await applicationsModel.create(value);
        res.status(201).json({ message: 'Application Created Successfully', data: application });
    } catch (err) {
        console.error('Error creating application:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const changeApplicationViewStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await applicationsModel.findOne({ where: { id: applicationId } });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await applicationsModel.update({ viewed: 'YES' }, { where: { id: applicationId } });
        res.status(200).json({ message: 'Application view status changed successfully' });
    } catch (err) {
        console.error('Error changing application view status:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const listApplications = async (req, res) => {
    try {
        const applications = await applicationsModel.findAll({ where: { deleted: 'NO' } });
        res.status(200).json({ message: 'Applications List', data: applications });
    } catch (err) {
        console.error('Error listing applications:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

