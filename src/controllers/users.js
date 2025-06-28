export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: user,
    },
  });
};
