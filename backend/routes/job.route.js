
import express from 'express';
import isAuthenticated from '../middlewares/isauthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", isAuthenticated, getAllJobs);  // Changed to GET for fetching all jobs
router.get("/getadminjobs", isAuthenticated, getAdminJobs);  // Keep as GET for fetching admin jobs
router.get("/get/:id", isAuthenticated, getJobById);  // Changed to GET for fetching job by ID

export default router;
