import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addFavoriteRecipesController,
  delFavoriteRecipesController,
} from '../controllers/recipes.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.post('/:recipeId', ctrlWrapper(addFavoriteRecipesController));

router.delete('/:recipeId', ctrlWrapper(delFavoriteRecipesController));
