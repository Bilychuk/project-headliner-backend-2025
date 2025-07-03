import express from 'express';

// import { Router } from 'express';

import {
  createRecipeController,
  getOwnRecipesController,
  getAllRecipesController,
  getRecipeByIdController,
  addFavoriteRecipesController,
  delFavoriteRecipesController,
} from '../controllers/recipes.js';
import { createRecipeSchema } from '../validation/recipes.js';
// import { getRecipeByIdController } from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));
router.post(
  '/',
  authenticate,
  upload.single('thumb'),
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);
router.get('/', ctrlWrapper(getAllRecipesController));
router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '/favorites/:recipeId',
  authenticate,
  ctrlWrapper(addFavoriteRecipesController),
);

router.delete(
  '/favorites/:recipeId',
  authenticate,
  ctrlWrapper(delFavoriteRecipesController),
);
export default router;
