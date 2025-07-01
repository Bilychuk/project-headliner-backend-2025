import { getAllRecipes, getRecipeById } from '../services/recipes.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

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

export const getAllRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const recipes = await getAllRecipes({ page, perPage, filter });

  let message = '';
  if (recipes.totalItems > 0) {
    message = 'Successfully found recipes!';
  } else {
    message = 'No recipes found matching your criteria.';
  }

  res.status(200).json({
    status: 200,
    message: message,
    data: recipes,
  });
};
