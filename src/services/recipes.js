import { IngredientCollection } from '../db/models/ingredient.js';
import { RecipesCollection } from '../db/models/recipe.js';
import { UsersCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export async function getOwnRecipes({ page = 1, perPage = 12, owner }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const recipesQuery = RecipesCollection.find({ owner });

  const [totalItems, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery.skip(skip).limit(perPage).exec(),
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
// =====================

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne({ _id: recipeId }).populate(
    'ingredients.id',
    'name',
  );
  return recipe;
};

//===================================
export const addFavoriteRecipes = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId).populate('favorites');

  const check = user.favorites.some((fav) => fav._id.toString() === recipeId);
  if (check) {
    throw createHttpError(400, 'Recipe is already in favorites');
  }

  user.favorites.push(recipeId);
  await user.save();

  return user;
};

export const delFavoriteRecipes = async (userId, recipeId) => {
  const user = await UsersCollection.findById(userId).populate('favorites');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
  await user.save();

  return user;
};

export const getAllRecipes = async ({ page, perPage, filter = {} }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const baseFilter = { ...filter };

  if (baseFilter.ingredient && typeof baseFilter.ingredient === 'string') {
    const ingredientName = baseFilter.ingredient;
    const foundIngredient = await IngredientCollection.findOne({
      name: { $regex: new RegExp(ingredientName.trim(), 'i') },
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
    delete baseFilter.ingredient;
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

  const transformedRecipes = recipes.map((recipe) => {
    const recipeObj = recipe.toObject();

    if (recipeObj.ingredients && Array.isArray(recipeObj.ingredients)) {
      recipeObj.ingredients = recipeObj.ingredients.map((ing) => {
        if (ing.id && ing.id._id && ing.id.name) {
          return {
            _id: ing.id._id,
            name: ing.id.name,
            measure: ing.measure,
            desc: ing.id.desc,
            img: ing.id.img,
          };
        }
        return ing;
      });
    }
    return recipeObj;
  });

  const paginationData = calculatePaginationData(recipesCount, perPage, page);
  return {
    data: transformedRecipes,
    ...paginationData,
  };
};
