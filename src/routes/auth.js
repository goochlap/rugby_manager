import { Router } from 'express';
import { register, login, currentUser } from '../controllers/auth';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/me', protect, currentUser);
router.post('/register', register);
router.post('/login', login);

export default router;
