import { Router } from 'express';
import * as PaymentMethodController from '../controllers/paymentMethodController.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = Router();

router.post('/', verifyToken, PaymentMethodController.createPaymentMethodController);
router.get('/', verifyToken, PaymentMethodController.getAllPaymentMethodsController);
router.get('/:id', verifyToken, PaymentMethodController.getPaymentMethodByIdController);
router.put('/:id', verifyToken, PaymentMethodController.updatePaymentMethodController);
router.delete('/:id', verifyToken, PaymentMethodController.deletePaymentMethodController);

export default router;