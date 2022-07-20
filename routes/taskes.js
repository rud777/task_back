import express from 'express';

import TaskesController from "../controllers/TaskesController";

const router = express.Router();
router.post('/create', TaskesController.create)
router.put('/update', TaskesController.updateTaskes)
router.delete('/delete', TaskesController.deleteTaskes)


export default router;
