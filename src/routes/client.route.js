import express from "express";
import { createJob, deleteJob, getJobs, makeJobToActive, makeJobToInactive, updateJob } from "../controllers/job.controller.js";
import { listClientStaging, updateClientStaging } from "../controllers/client.controller.js";

const router=express.Router();

//Job management

router.post('/jobs/create', createJob);

router.get('/jobs', getJobs);

router.put('/jobs/:jobId/inactive', makeJobToInactive);

router.put('/jobs/:jobId/active', makeJobToActive);

router.put('/jobs/update/:jobId', updateJob);

router.delete('/jobs/delete/:jobId', deleteJob);

// Staging management

router.put('/client/:clientId/staging', updateClientStaging);

router.get('/client/:clientId/staging', listClientStaging);

export default router;