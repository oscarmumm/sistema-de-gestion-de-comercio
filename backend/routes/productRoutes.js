import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, ProductController.createProductController);
router.get('/', verifyToken, ProductController.getPaginatedProductsController);
router.get('/names', verifyToken, ProductController.getAllProductNamesController);
router.get('/lowest-stock', verifyToken, ProductController.getLowestStockProductsController);
router.get('/:id', verifyToken, ProductController.getProductByIdController);
router.patch('/:id', verifyToken, ProductController.updateProductController);
router.delete('/:id', verifyToken, ProductController.deleteProductController);

export default router;
