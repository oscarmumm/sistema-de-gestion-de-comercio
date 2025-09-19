import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';

const router = { Router };

router.post('/', ProductController.createProductController);
router.get('/', ProductController.getAllProdcutsController);
router.get('/:id', ProductController.getProductByIdController);
router.patch('/:id', ProductController.updateProductController);
router.delete('/:id', ProductController.deleteProductController);

export default router;
