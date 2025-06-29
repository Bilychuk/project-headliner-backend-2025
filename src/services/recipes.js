import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllMyRecipes({ page = 1, perPage = 10, owner }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const recipesQuery = RecipesCollection.find({ owner });

  const [totalItems, recipes] = await Promise.all([
    RecipesCollection.countDocuments(recipesQuery),
    recipesQuery.skip(skip).limit(perPage),
  ]);

  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    data: recipes,
    ...paginationData,
  };
}

export const createRecipe = async (payload) => {
  const recipe = await RecipesCollection.create(payload);
  return recipe;
};
