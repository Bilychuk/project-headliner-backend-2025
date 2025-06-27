import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import User from '../db/models/user.js';

const SECRET = getEnvVar('JWT_SECRET');

export default async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      });
    }

    const payload = jwt.verify(token, SECRET);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Invalid or expired token',
    });
  }
}

// const authenticate = (req, res, next) => {
//   req.user = {
//     _id: '1234567890',
//     name: 'Test User',
//     email: 'test@example.com',
//   };
//   next();
// };

// export default authenticate;
