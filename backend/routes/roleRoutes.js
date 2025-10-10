import {Router} from 'express';
import * as RoleController from '../controllers/roleController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, RoleController.createRoleController);
router.get('/', verifyToken, RoleController.getAllRolesController);
router.get('/:id', verifyToken, RoleController.getRoleByIdController);
router.put('/:id', verifyToken, RoleController.updateRoleController);
router.delete('/:id', verifyToken, RoleController.deleteRoleController);

export default router;
