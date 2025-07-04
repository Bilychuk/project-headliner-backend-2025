import { CategoriesCollection } from '../db/models/category.js';

export const getCategories = async (req, res, next) => {
  const categories = await CategoriesCollection.find();

  return categories;
};
