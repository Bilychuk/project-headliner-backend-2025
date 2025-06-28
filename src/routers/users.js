import express from 'express';
import { getCurrentUserController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';



const router = express.Router();

router.get('/current', authenticate, getCurrentUserController);




export default router;

