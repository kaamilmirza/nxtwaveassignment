import { Router } from 'express';
import authRoutes from './auth/index';
import todoRoutes from './todos/index';
import profileRoutes from './profile/index';
import { isAuthenticated } from '../middleware/authenticate';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todos', isAuthenticated, todoRoutes);
router.use('/profile', isAuthenticated, profileRoutes);

export default router;
