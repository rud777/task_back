import express from 'express';

import ProjectController from "../controllers/ProjectController";

const router = express.Router();
router.post('/create', ProjectController.create)
router.put('/update', ProjectController.updateProject)
router.delete('/delete/:id', ProjectController.deleteProject)
router.get('/list', ProjectController.listProject)


export default router;
