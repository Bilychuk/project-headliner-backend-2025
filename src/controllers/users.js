import UsersCollection from '../db/models/user.js';

export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 200,
    message: 'Successfully found user',
    data: user,
  });
};

export const getFavoriteRecipesController = async (req, res, next) => {
  try {
    console.log('USER:', req.user);
    const user = await UsersCollection.findById(req.user._id).populate('favorites');
    console.log('USER FROM DB:', user);
    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    if (!Array.isArray(user.favorites)) {
      return res.status(500).json({ status: 500, message: 'Favorites field is not an array' });
    }
    res.status(200).json({
      status: 200,
      message: 'Favorite recipes fetched successfully',
      data: user.favorites,
    });
  } catch (error) {
    console.log('ERROR:', error);
    next(error);
  }
};

