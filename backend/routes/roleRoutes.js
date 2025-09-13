import {Router} from 'express';
import * as RoleController from '../controllers/roleController';

const router = Router();

router.post('/', RoleController.createRoleController);
router.get('/', RoleController.getRoleController);
router.put('/:id', RoleController.updateRoleController);
router.delete('/:id', RoleController.deleteRoleController);

export default router;
