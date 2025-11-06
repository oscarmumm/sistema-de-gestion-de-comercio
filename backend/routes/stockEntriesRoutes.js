import { Router } from 'express';
import * as StockEntriesController from '../controllers/stockEntriesController.js';
import * as StockEntryItemsController from '../controllers/stockEntryItemsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
    '/',
    verifyToken,
    StockEntriesController.createStockEntriesController
);
router.post(
    '/:entryId/items',
    verifyToken,
    StockEntryItemsController.createStockEntryItemController
);
router.get(
    '/:id',
    verifyToken,
    StockEntriesController.getStockEntryByIdController
);
router.get(
    '/items/:id',
    verifyToken,
    StockEntryItemsController.getStockEntriesByEntryIdController
);

export default router;
