import { THIRTY_DAYS } from '../constants/index.js';
import { loginUser, registerUser, logoutUser } from '../services/auth.js';


export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};


export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  if (sessionId) {
    await logoutUser({ sessionId, refreshToken });
  }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

  res.status(204).send();
    };
