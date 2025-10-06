import { Router } from 'express';
import { loginController } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', loginController);
router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

export default router;
