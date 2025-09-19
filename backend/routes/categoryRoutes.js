import {Router} from 'express';
import * as CategoryController from '../controllers/categoryController.js';

const router = Router();

router.post('/', CategoryController.createCategoryController);
router.get('/', CategoryController.getAllCategoriesController);
router.get('/:id', CategoryController.getCategoryByIdController);
router.put('/:id', CategoryController.updateCategoryController);
router.delete('/:id', CategoryController.deleteCategoryController);

export default router;
