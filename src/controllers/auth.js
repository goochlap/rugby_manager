import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { User } from '../models/User';

// @desc      Register User
// @route     POST /api/v1/auth/register
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

// @desc      Login User
// @route     POST /api/v1/auth/login
// @access    Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Please provide an email and a password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorResponse('Invalid credentials', 401));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

  const token = user.signWithToken();

  res.status(200).json({ success: true, token });
});
