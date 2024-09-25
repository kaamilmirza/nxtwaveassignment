import express from 'express';
import { changePassword, getUserProfile, updateUserProfile } from '../../controllers/profile';
import { isAuthenticated } from "../../middleware/authenticate";

const router = express.Router();

router.get('/', isAuthenticated, getUserProfile);
router.put('/', isAuthenticated, updateUserProfile);
router.put('/password', isAuthenticated, changePassword);

export default router;
