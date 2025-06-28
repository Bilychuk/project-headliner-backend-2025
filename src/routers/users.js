import express from 'express';
import { getCurrentUserController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';


const router = express.Router();

router.use(authenticate);

router.get('/current', getCurrentUserController);

export default router;
