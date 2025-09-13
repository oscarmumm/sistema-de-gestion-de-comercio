import {Router} from 'express';
import * as UserController from '../controllers/userController';

const router = Router();

router.post('/', UserController.createUserController);
router.get('/', UserController.getUserController);
router.patch('/:id', UserController.updateUserController);
router.delete('/:id', UserController.deleteUserController);

export default router;