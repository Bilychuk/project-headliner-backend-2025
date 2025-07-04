import UsersCollection from '../db/models/user.js';

export const getFavoriteRecipes = async (userId) => {
  return await UsersCollection.findById(userId).populate('favorites');
};
