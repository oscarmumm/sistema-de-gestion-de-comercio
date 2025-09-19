import {Router} from 'express';
import * as BrandController from '../controllers/brandController.js';

const router = Router();

router.post('/', BrandController.createBrandController);
router.get('/', BrandController.getAllBrandsController);
router.get('/:id', BrandController.getBrandByIdController);
router.put('/:id', BrandController.updateBrandController);
router.delete('/:id', BrandController.deleteBrandController);

export default router;