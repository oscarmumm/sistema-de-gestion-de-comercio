import {Router} from 'express';
import * as SupplierController from '../controllers/supplierController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, SupplierController.createSupplierController);
router.get('/', verifyToken, SupplierController.getAllSuppliersController);
router.get('/:id', verifyToken, SupplierController.getSupplierByIdController);
router.put('/:id', verifyToken, SupplierController.updateSupplierController);
router.delete('/:id', verifyToken, SupplierController.deleteSupplierController);

export default router;