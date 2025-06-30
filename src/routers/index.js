import { Router } from 'express';
import authRouter from './auth.js';
import categoriesRouter from './categories.js';
import ingredientsRouter from './ingredients.js';
import recipesRouter from './recipes.js';
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);

export default router;
