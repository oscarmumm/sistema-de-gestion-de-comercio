import {Router} from 'express';
import * as SupplierController from '../controllers/supplierController.js';

const router = Router();

router.post('/', SupplierController.createSupplierController);
router.get('/', SupplierController.getAllSuppliersController);
router.get('/:id', SupplierController.getSupplierByIdController);
router.put('/:id', SupplierController.updateSupplierController);
router.delete('/:id', SupplierController.deleteSupplierController);

export default router;