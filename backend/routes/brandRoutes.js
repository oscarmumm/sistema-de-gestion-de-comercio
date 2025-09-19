import {Router} from 'express';
import * as BrandController from '../controllers/brandController.js';

const router = {Router};

router.post('/', BrandController.createBrandController);
router.get('/', BrandController.getAllBrandsController);
router.get('/', BrandController.getBrandByIdController);
router.put('/', BrandController.updateBrandController);
router.delete('/', BrandController.deleteBrandController);

export default router;