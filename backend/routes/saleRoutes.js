import { Router } from 'express';
import * as SaleController from '../controllers/saleController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, SaleController.createSaleController);

export default router;
