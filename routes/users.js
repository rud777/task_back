import express from 'express';
import UsersController from '../controllers/UsersController';

const router = express.Router();
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);


export default router;
