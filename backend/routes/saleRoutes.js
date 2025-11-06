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
router.get(
    '/daily/products',
    verifyToken,
    SaleController.getProductsSoldByDateController
);
router.get(
    '/daily/payment-methods',
    verifyToken,
    SaleController.getSalesByPaymentMethodController
);
router.get(
    '/daily/categories',
    verifyToken,
    SaleController.getSalesByCategoryController
);
router.get('/:id', verifyToken, SaleController.getSaleByIdController);
router.get(
    '/items/:id',
    verifyToken,
    SaleItemController.getItemsBySaleIdController
);

export default router;
