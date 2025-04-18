import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controller/userController.js';
import protectRoute from '../middleware/middleware.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.post('/update-profile',protectRoute,updateProfile) 
router.get('/check',protectRoute,checkAuth) 

export default router;