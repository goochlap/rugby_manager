import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { User } from '../models/User';

// @desc      Register User
// @route     GET /api/v1/auth/register
// @access    Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  const token = user.signWithToken();

  res.status(201).json({ success: true, token });
});
