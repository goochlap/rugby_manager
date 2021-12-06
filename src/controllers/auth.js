import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { User } from '../models/User';

// @desc      Register User
// @route     GET /api/v1/auth/register
// @access    Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  console.log(name);
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({ success: true, user });
});
