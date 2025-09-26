import { Router } from 'express';
import * as CategoryController from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, CategoryController.createCategoryController);
router.get('/', verifyToken, CategoryController.getAllCategoriesController);
router.get('/:id', verifyToken, CategoryController.getCategoryByIdController);
router.put('/:id', verifyToken, CategoryController.updateCategoryController);
router.delete('/:id', verifyToken, CategoryController.deleteCategoryController);

export default router;
