import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addFavoriteRecipesController,
  delFavoriteRecipesController,
  getRecipeByIdController,
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { authenticate } from '../middlewares/authenticate.js';
import {

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));
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
