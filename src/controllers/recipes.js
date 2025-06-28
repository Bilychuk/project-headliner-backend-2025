import createHttpError from 'http-errors';
import { createRecipe } from '../services/recipes.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// import { parsePaginationParams } from '../utils/parsePaginationParams.js';
// import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

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
