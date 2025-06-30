import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getRecipeByIdController } from '../controllers/recipes.js';
import {
  addFavoriteRecipesController,
  delFavoriteRecipesController,
} from '../controllers/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '/:recipeId',
  authenticate,
  ctrlWrapper(addFavoriteRecipesController),
);

router.delete(
  '/:recipeId',
  authenticate,
  ctrlWrapper(delFavoriteRecipesController),
);
export default router;
