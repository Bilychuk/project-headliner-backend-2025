import express from 'express';
import { getCurrentUser } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/current', authenticate, getCurrentUser);

export default router;
