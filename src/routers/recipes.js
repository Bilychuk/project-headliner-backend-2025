import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { getFavoriteRecipesController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));
router.get(
  '/favorites',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController)
);

export default router;
