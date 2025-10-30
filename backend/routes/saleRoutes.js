import { Router } from 'express';
import * as SaleController from '../controllers/saleController.js';
import * as SaleItemController from '../controllers/saleItemController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, SaleController.createSaleController);
router.post(
    '/:saleId/items',
    verifyToken,
    SaleItemController.createSaleItemsController
);
router.get('/daily', verifyToken, SaleController.getSalesByDayController);
router.get('/daily/products', verifyToken, SaleController.getProductsSoldByDateController);

export default router;
