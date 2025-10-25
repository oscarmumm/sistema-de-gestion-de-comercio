import { Router } from 'express';
import * as StockEntriesController from '../controllers/stockEntriesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
    '/',
    verifyToken,
    StockEntriesController.createStockEntriesController
);

export default router;
