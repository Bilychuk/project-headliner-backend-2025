import { IngredientCollection } from '../db/models/ingredient.js';
import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne({ _id: recipeId }).populate(
    'ingredients.id',
    'name',
  );
  return recipe;
};

export const getAllRecipes = async ({ page, perPage, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const baseFilter = { ...filter };

  if (baseFilter.ingredients && typeof baseFilter.ingredients === 'string') {
    const ingredientName = baseFilter.ingredients;

    const foundIngredient = await IngredientCollection.findOne({
      name: ingredientName,
    })
      .select('_id')
      .exec();

    if (!foundIngredient) {
      return {
        data: [],
        page,
        perPage,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    const ingredientId = foundIngredient._id;

    baseFilter.ingredients = { $elemMatch: { id: ingredientId } };
  }

  const recipesQuery = RecipesCollection.find(baseFilter);
  const recipesCount = await RecipesCollection.countDocuments(baseFilter);

  const recipes = await recipesQuery
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'ingredients.id',
      model: 'ingredients',
      select: 'name desc img',
    })
    .exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};
