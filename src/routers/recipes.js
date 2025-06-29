import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addFavoriteRecipesController,
  delFavoriteRecipesController,
} from '../controllers/recipes.js';
const router = express.Router();

router.post('/:recipeId', ctrlWrapper(addFavoriteRecipesController));

router.delete('/:recipeId', ctrlWrapper(delFavoriteRecipesController));
