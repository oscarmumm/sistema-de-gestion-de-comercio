import { Router } from 'express';
import * as PaymentMethodController from '../controllers/paymentMethodController.js';

const router = Router();

router.post('/', PaymentMethodController.createPaymentMethodController);
router.get('/', PaymentMethodController.getAllPaymentMethodsController);
router.get('/', PaymentMethodController.getPaymentMethodByIdController);
router.put('/', PaymentMethodController.updatePaymentMethodController);
router.delete('/', PaymentMethodController.deletePaymentMethodController);

export default router;