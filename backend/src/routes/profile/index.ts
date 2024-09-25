import { Router } from 'express';
import { isAuthenticated } from '../../middleware/authenticate';
import { getProfile, updateProfile } from '../../controllers/profile';

const profileRoutes = Router();

profileRoutes.get('/', isAuthenticated, getProfile);
profileRoutes.put('/', isAuthenticated, updateProfile);

export default profileRoutes;
