export const getCurrentUser = async (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: { _id, name, email },
    },
  });
};
