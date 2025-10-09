import { Router } from 'express';
import * as PaymentMethodController from '../controllers/paymentMethodController.js';

const router = Router();

router.post('/', PaymentMethodController.createPaymentMethodController);
router.get('/', PaymentMethodController.getAllPaymentMethodsController);
router.get('/:id', PaymentMethodController.getPaymentMethodByIdController);
router.put('/:id', PaymentMethodController.updatePaymentMethodController);
router.delete('/:id', PaymentMethodController.deletePaymentMethodController);

export default router;