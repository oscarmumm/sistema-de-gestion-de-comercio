import { Router } from 'express';
import * as ProductController from '../controllers/productController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = Router();

router.post('/', verifyToken, ProductController.createProductController);
router.get('/', verifyToken, ProductController.getAllProdcutsController);
router.get('/:id', verifyToken, ProductController.getProductByIdController);
router.patch('/:id', verifyToken, ProductController.updateProductController);
router.delete('/:id', verifyToken, ProductController.deleteProductController);

export default router;
