import { RecipesCollection } from '../db/models/recipe.js';

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne({ _id: recipeId }).populate(
    'ingredients.id',
    'name',
  );
  return recipe;
};
