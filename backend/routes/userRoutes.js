import { Router } from 'express';
import * as UserController from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, UserController.createUserController);
router.get('/', verifyToken, UserController.getUserController);
router.get('/:id', verifyToken, UserController.getUserByIdController);
router.patch('/:id', verifyToken, UserController.updateUserController);
router.delete('/:id', verifyToken, UserController.deleteUserController);

export default router;
