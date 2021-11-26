import errorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import { Team } from '../models/Team';

// @desc      Get teams
// @route     GET /api/v1/teams
// @access    Public
export const getTeams = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  query = Team.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Team.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const teams = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({ success: true, count: teams.length, pagination, teams });
});

// @desc      Get a single team
// @route     GET /api/v1/teams/:id
// @access    Public
export const getTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, data: team });
});

// @desc      Create new team
// @route     POST /api/v1/teams
// @access    Private
export const createTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.create(req.body);

  res.status(201).json({ success: true, data: team });
});

// @desc      Update a team
// @route     PUT /api/v1/teams/:id
// @access    Private
export const updateTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(200).json({ success: true, data: team });
});

// @desc      Delete a team
// @route     DELETE /api/v1/teams/:id
// @access    Private
export const deleteTeam = asyncHandler(async (req, res, next) => {
  const team = await Team.findByIdAndDelete(req.params.id);

  if (!team) {
    return next(new errorResponse(`Team with id: ${req.params.id} not found`, 404));
  }

  res.status(204).send();
});
