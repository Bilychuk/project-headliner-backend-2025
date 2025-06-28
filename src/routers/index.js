import { Router } from 'express';
import authRouter from './auth.js';
import categoriesRouter from "./categories.js";
import ingredientsRouter from "./ingredients.js";
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use("/categories", categoriesRouter);
router.use("/ingredients", ingredientsRouter);
router.use('/users', usersRouter);

export default router;
