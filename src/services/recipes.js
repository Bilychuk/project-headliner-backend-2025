import { RecipesCollection } from '../db/models/recipe.js';
import { UsersCollection } from '../db/models/user.js';

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne({ _id: recipeId }).populate(
    'ingredients.id',
    'name',
  );
  return recipe;
};

const addFavoriteRecipes = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const check = user.favorites.includes(recipeId);
  if (check) {
    throw new Error('Recipe is already in favorites');
  }

  user.favorites.push(recipeId);
  await user.save();
};

const delFavoriteRecipes = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);

  await user.save();
};

export { addFavoriteRecipes, delFavoriteRecipes };
