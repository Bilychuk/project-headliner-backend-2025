import { addFavoriteRecipes, delFavoriteRecipes } from '../services/recipes.js';

const addFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await addFavoriteRecipes(userId, recipeId);

  res.json({
    status: 200,
    message: 'Recipe added to favorites',
  });
};

const delFavoriteRecipesController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await delFavoriteRecipes(userId, recipeId);
};

export { addFavoriteRecipesController, delFavoriteRecipesController };
