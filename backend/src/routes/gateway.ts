import { Router } from 'express';
import authRoutes from './auth/index';
import todoRoutes from './todos/index';
import profileRoutes from './profile/index';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todos', todoRoutes);
router.use('/profile', profileRoutes);

export default router;
