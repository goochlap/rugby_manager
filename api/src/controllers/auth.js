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

  sendTokenResponse(user, 201, res);
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

  sendTokenResponse(user, 200, res);
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
export const currentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ sucess: true, user });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.signWithToken();

  const options = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ succes: true, token });
};
