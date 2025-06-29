import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

export default router;
