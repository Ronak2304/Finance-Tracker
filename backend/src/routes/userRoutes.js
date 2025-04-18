import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controller/userController.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.post('/update-profile',updateProfile) // have to add middleware 
router.get('/check',checkAuth) // have to add middleware

export default router;