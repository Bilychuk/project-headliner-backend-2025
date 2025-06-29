import createHttpError from 'http-errors';
import {
  createRecipe,
  getAllMyRecipes,
  getRecipeById,
} from '../services/recipes.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
// import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

// ==/==/==/==/==/ GET ALL MY /==/==/==/==/==
export const getRecipesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const contacts = await getAllMyRecipes({
    page,
    perPage,
    owner: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: contacts,
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
