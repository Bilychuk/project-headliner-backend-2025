import { getRecipeById } from '../services/recipes.js';
import createHttpError from 'http-errors';
import { addFavoriteRecipes, delFavoriteRecipes } from '../services/recipes.js';

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const addFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await addFavoriteRecipes(userId, recipeId);

  res.json({
    status: 200,
    message: 'Recipe added to favorites',
  });
};

export const delFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await delFavoriteRecipes(userId, recipeId);
};
