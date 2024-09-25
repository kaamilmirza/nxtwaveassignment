import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticate';
import { getProfile, updateProfile } from '../../controllers/profile';

const profileRoutes = Router();

profileRoutes.get('/', authenticateToken, getProfile);
profileRoutes.put('/', authenticateToken, updateProfile);

export default profileRoutes;
