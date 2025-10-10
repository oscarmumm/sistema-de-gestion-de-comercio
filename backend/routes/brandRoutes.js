import {Router} from 'express';
import * as BrandController from '../controllers/brandController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, BrandController.createBrandController);
router.get('/', verifyToken, BrandController.getAllBrandsController);
router.get('/:id', verifyToken, BrandController.getBrandByIdController);
router.put('/:id', verifyToken, BrandController.updateBrandController);
router.delete('/:id', verifyToken, BrandController.deleteBrandController);

export default router;