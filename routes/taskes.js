import express from 'express';

import TaskesController from "../controllers/TaskesController";
import ProjectController from "../controllers/ProjectController";

const router = express.Router();
router.post('/create', TaskesController.create)
router.put('/update', TaskesController.updateTaskes)
router.get('/list', TaskesController.listTaskes)


export default router;
