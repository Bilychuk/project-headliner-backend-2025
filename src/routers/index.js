import { Router } from 'express';
import authRouter from './auth.js';
import categoriesRouter from "./categories.js";
import ingredientsRouter from "./ingredients.js";

const router = Router();

router.use('/auth', authRouter);
router.use("/categories", categoriesRouter);
router.use("/ingredients", ingredientsRouter);

export default router;
