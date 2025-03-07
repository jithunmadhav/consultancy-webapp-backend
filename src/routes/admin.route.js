import express from "express";
import { banClient, createClient, deleteClient, getClients, listBannedClients, unbanClient, updateClient } from "../controllers/clientMng.controller.js";
import { uploadFiles } from "../controllers/fileUpload.controller.js";
import verifyAdmin from "../middlewares/admin.auth.js";
import { createApplication } from "../controllers/application.controller.js";
import { addProgrammingSkill, deleteProgrammingSkill, getProgrammingSkills } from "../controllers/admin.controller.js";
import { blockCandidate, createCandidate, deleteCandidate, listCandidates, unblockCandidate, updateCandidate } from "../controllers/candidate.controller.js";
import { createStaging, deleteStaging, getStaging, updateStaging } from "../controllers/staging.controller.js";

const router = express.Router();

// client management

router.post('/client/create',verifyAdmin, createClient);

router.patch('/client/ban/:clientId',verifyAdmin, banClient);

router.patch('/client/unban/:clientId',verifyAdmin, unbanClient);

router.get('/client/list',verifyAdmin, getClients);

router.get('/client/banned',verifyAdmin, listBannedClients);

router.put('/client/update/:clientId',verifyAdmin, updateClient);

router.delete('/client/delete/:clientId',verifyAdmin, deleteClient);

// upload files

router.post('/upload',verifyAdmin, uploadFiles);

// Application management

router.post('/application/create',verifyAdmin,createApplication)

// Adding programming skills

router.post('/skills/add',verifyAdmin, addProgrammingSkill)

router.get('/skills',verifyAdmin, getProgrammingSkills)

router.delete('/skills/delete/:skillId',verifyAdmin,deleteProgrammingSkill)

// Candidate management
 
router.post("/candidates",verifyAdmin, createCandidate);

router.get("/candidates",verifyAdmin, listCandidates);

router.patch("/candidates/block/:candidateId",verifyAdmin, blockCandidate);

router.patch("/candidates/unblock/:candidateId",verifyAdmin, unblockCandidate);

router.delete("/candidates/:candidateId",verifyAdmin, deleteCandidate);

router.put("/candidates/:candidateId",verifyAdmin, updateCandidate);

// Staging management

router.post("/staging", createStaging);

router.get("/staging", getStaging);

router.delete("/staging/:stagingId",verifyAdmin, deleteStaging);

router.put("/staging/:stagingId",verifyAdmin, updateStaging);





export default router