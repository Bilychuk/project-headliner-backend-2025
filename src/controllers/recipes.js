import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getOwnRecipes,
  addFavoriteRecipes,
  delFavoriteRecipes,
} from '../services/recipes.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// ===================

// ==/==/==/==/==/ GET ALL MY /==/==/==/==/==
export const getOwnRecipesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const recipes = await getOwnRecipes({
    page,
    perPage,
    owner: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found own recipes!',
    data: recipes,
  });
};
// ==/==/==/==/==/==/==/==/==/==/==/==/==

// ==/==/==/==/==/ CREATE /==/==/==/==/==
export const createRecipeController = async (req, res, next) => {
  try {
    const photo = req.file;
    let photoUrl = null;
    try {
      if (photo) {
        const localPath = await saveFileToUploadDir(photo);
        photoUrl = await saveFileToCloudinary(localPath);
      }
    } catch {
      return next(createHttpError(500, 'Failed to upload photo'));
    }
    const recipe = await createRecipe({
      ...req.body,
      owner: req.user.id,
      thumb: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a recipe!',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
// ==/==/==/==/==/==/==/==/==/==/==/==/==

// ==/==/==/==/==/ GET BY ID /==/==/==/==/==
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

// ==/==/==/==/==/==/==/==/==/==/==/==/==
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

  res.status(204).end();
};

// ==/==/==/==/==/==/==/==/==/==/==/==/==

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
