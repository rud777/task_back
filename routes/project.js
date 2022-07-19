import express from 'express';

import ProjectController from "../controllers/ProjectController";

const router = express.Router();
router.post('/add', ProjectController.add)
router.post('/update', ProjectController.updateProject)


export default router;
